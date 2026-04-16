import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { SessionData, Usuario } from "./types"

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
)

const COOKIE_NAME = "session"
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24, // 24 hours
  path: "/",
}

export async function createSession(usuario: Usuario): Promise<string> {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

  const session: SessionData = {
    usuario,
    expiresAt,
  }

  const token = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY)

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS)

  return token
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    const session = payload as unknown as SessionData

    // Verificar si la sesión expiró
    if (Date.now() > session.expiresAt) {
      await deleteSession()
      return null
    }

    return session
  } catch (error) {
    await deleteSession()
    return null
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function updateSession(): Promise<void> {
  const session = await getSession()
  if (session) {
    await createSession(session.usuario)
  }
}

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value || null
}
