import { NextRequest, NextResponse } from "next/server"
import { createSession } from "@/lib/auth/session"
import { Usuario } from "@/lib/auth/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { usuario } = body as { usuario: Usuario }

    if (!usuario || !usuario.id || !usuario.rol) {
      return NextResponse.json(
        { success: false, message: "Datos de usuario inválidos" },
        { status: 400 }
      )
    }

    await createSession(usuario)

    return NextResponse.json({
      success: true,
      usuario,
    })
  } catch (error) {
    console.error("Error en selección de rol:", error)
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 }
    )
  }
}
