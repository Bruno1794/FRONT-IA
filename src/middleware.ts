import {NextRequest, NextResponse} from "next/server";
import getUser from "@/action/user/get-user";

export async function middleware(request: NextRequest) {

    const {user} = await getUser();

// Se o usuário estiver autenticado e tentando acessar a página inicial (login)
    if (user && request.nextUrl.pathname === '/') {
        // Redireciona para o /dashboard se o usuário já estiver logado
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Se o usuário não estiver autenticado e tentar acessar páginas protegidas
    if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
        // Redireciona para a página de login
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next(); // Permite que o middleware con
}

export const config = {
    matcher: ['/dashboard/:path*', '/']
}