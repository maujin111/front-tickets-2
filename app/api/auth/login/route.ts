import { NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth/auth"
import { createSession } from "@/lib/auth/session"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cedula, password } = body

    if (!cedula || !password) {
      return NextResponse.json(
        { success: false, message: "Cédula y contraseña son requeridos" },
        { status: 400 }
      )
    }

    const result = await authenticateUser(cedula, password)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message || "Error de autenticación" },
        { status: 401 }
      )
    }

    // Si requiere selección de rol, retornar opciones sin crear sesión
    if (result.requiresRoleSelection && result.opciones) {
      return NextResponse.json({
        success: true,
        requiresRoleSelection: true,
        opciones: result.opciones,
      })
    }

    // Crear sesión para login normal
    if (result.usuario) {
      await createSession(result.usuario)

      return NextResponse.json({
        success: true,
        usuario: result.usuario,
      })
    }

    return NextResponse.json(
      { success: false, message: "Error de autenticación" },
      { status: 401 }
    )
  } catch (error) {
    console.error("Error en login:", error)
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 }
    )
  }
}
