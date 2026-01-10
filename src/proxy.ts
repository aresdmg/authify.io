import { NextResponse, NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path == "/" || path == "/auth/sign-up" || path === "/auth/sign-in"

    const accessToken = request.cookies.get("authify_accessToken")?.value || ''

    if (!isPublicPath && !accessToken) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }

    if (isPublicPath && accessToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/auth/:path',
        '/console',
        '/dashboard'
    ]
}