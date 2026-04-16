import { NextResponse } from "next/server"
import { getSession, getSessionToken } from "@/lib/auth/session"

export async function GET() {
  try {
    const session = await getSession()
    const token = await getSessionToken()

    if (!session) {
      return NextResponse.json(
        { authenticated: false, usuario: null, token: null },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      usuario: session.usuario,
      token,
    })
  } catch (error) {
    console.error("Error obteniendo sesión:", error)
    return NextResponse.json(
      { authenticated: false, usuario: null, token: null },
      { status: 500 }
    )
  }
}
