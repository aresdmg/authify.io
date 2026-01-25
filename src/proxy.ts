import axios, { isAxiosError } from 'axios'
import { NextResponse, NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path == "/" || path == "/auth/sign-up" || path === "/auth/sign-in"

    const accessToken = request.cookies.get("authify_accessToken")?.value || ''
    const refreshToken = request.cookies.get("authify_refreshTokne")?.value || ''

    if (!refreshToken) {
        try {
            await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/token`, { withCredentials: true })
        } catch (error) {
            if (isAxiosError(error)) {
                const errMsg = error?.response?.data?.message || "Server error"
                console.log(errMsg);
            }
        }
    }

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
        '/auth/:path*',
        '/console',
        '/dashboard',
        '/dashboard/:path*'
    ]
}