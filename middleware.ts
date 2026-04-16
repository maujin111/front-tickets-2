import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
)

const protectedRoutes = ["/home"]
const publicRoutes = ["/login", "/"]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  )
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = request.cookies.get("session")?.value

  let session = null
  if (cookie) {
    try {
      const { payload } = await jwtVerify(cookie, SECRET_KEY)
      session = payload
    } catch (error) {
      // Token inválido o expirado
      session = null
    }
  }

  // Redirigir a login si intenta acceder a ruta protegida sin sesión
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirigir a home si está autenticado e intenta acceder a login
  if (path === "/login" && session) {
    return NextResponse.redirect(new URL("/home/soporte/tickets", request.url))
  }

  // Redirigir desde / a login o home según estado
  if (path === "/") {
    if (session) {
      return NextResponse.redirect(
        new URL("/home/soporte/tickets", request.url)
      )
    } else {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
