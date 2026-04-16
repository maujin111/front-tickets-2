import { prisma } from "@/lib/prisma"
import { verifyPassword } from "./password"
import { Usuario } from "./types"

export async function authenticateUser(
  cedula: string,
  password: string
): Promise<{
  success: boolean
  usuario?: Usuario
  message?: string
  requiresRoleSelection?: boolean
  opciones?: Usuario[]
}> {
  try {
    // Normalizar cédula/RUC
    let ruc = cedula
    let cedulaNormalizada = cedula

    if (cedula.length === 10) {
      ruc = cedula + "001"
    } else if (cedula.length === 13) {
      cedulaNormalizada = cedula.substring(0, 10)
    }

    // Buscar en ambas tablas
    const [cliente, agente] = await Promise.all([
      prisma.fEDIA_CLIE.findFirst({
        where: {
          FECLIE_ESTA: "1",
          OR: [{ FECLIE_CODC: cedulaNormalizada }, { FECLIE_CODC: ruc }],
        },
      }),
      prisma.sEDIA_CLAV.findFirst({
        where: {
          SECLAV_ESTA: true,
          OR: [{ FEEMPL_CEDU: cedulaNormalizada }, { FEEMPL_CEDU: ruc }],
        },
        include: {
          SEDIA_PRUS: {
            include: {
              SEDIA_PRIV: true,
            },
          },
        },
      }),
    ])

    let usuarioCliente: Usuario | null = null
    let usuarioAgente: Usuario | null = null

    // Verificar credenciales de cliente
    if (cliente && cliente.FECLIE_CLAV === password) {
      usuarioCliente = {
        id: cliente.FECLIE_IDEN,
        nombre: `${cliente.FECLIE_APEC} ${cliente.FECLIE_NOMC}`,
        rol: "CLI",
        avanzado: false,
      }
    }

    // Verificar credenciales de agente
    if (agente) {
      const isValid = await verifyPassword(password, agente.SECLAV_CLAV || "")

      if (isValid) {
        const privilegios = agente.SEDIA_PRUS.map((prus) => ({
          SEPRIV_IDEN: prus.SEDIA_PRIV?.SEPRIV_IDEN || 0,
          SEPRIV_DESC: prus.SEDIA_PRIV?.SEPRIV_NOMB || "",
        }))

        usuarioAgente = {
          id: agente.SECLAV_CODI,
          nombre: agente.SECLAV_USUA || "",
          rol: "AGE",
          avanzado: agente.SECLAV_TIPO === "A",
          privilegios,
        }
      }
    }

    // Si encontró credenciales válidas en ambas tablas
    if (usuarioCliente && usuarioAgente) {
      return {
        success: true,
        requiresRoleSelection: true,
        opciones: [usuarioCliente, usuarioAgente],
      }
    }

    // Si solo encontró en una tabla
    if (usuarioCliente) {
      return { success: true, usuario: usuarioCliente }
    }

    if (usuarioAgente) {
      return { success: true, usuario: usuarioAgente }
    }

    // Si existe el usuario pero la contraseña es incorrecta
    if (cliente || agente) {
      return { success: false, message: "Contraseña incorrecta" }
    }

    return { success: false, message: "Usuario no encontrado" }
  } catch (error) {
    console.error("Error en autenticación:", error)
    return { success: false, message: "Error en el servidor" }
  }
}
