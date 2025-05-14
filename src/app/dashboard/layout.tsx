'use client'
import React, {ReactNode} from "react";
import styles from "./layout.module.css"
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";


export default function LayoutSistema({children}: { children: ReactNode }) {

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    console.log(pathname);


    const handleClickOutside = (e: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
            setIsSidebarOpen(false);
        }
    };

    React.useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);
    return (
        <div className={styles.container}>

            {!isSidebarOpen && (
                <button
                    className={styles.menuButton}
                    onClick={() => setIsSidebarOpen(true)}
                >
                    ☰
                </button>
            )}
            {/* Overlay escuro que fecha o menu ao clicar fora */}
            {isSidebarOpen && <div className={styles.overlay}/>}

            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
                   ref={sidebarRef}>
                <nav>
                    <ul>

                        <Link
                            href="/dashboard">

                            <li onClick={() => setIsSidebarOpen(false)} className={`${styles.Liimg}
                            ${pathname === '/dashboard' || pathname === '/dashboard' ? styles.activeTeste : ''}`}>
                                <Image src="/img/dashboard-mini.png" alt="" width={16} height={16}/>
                                Início
                            </li>
                        </Link>

                        <Link href="/dashboard/config">
                            <li onClick={() => setIsSidebarOpen(false)} className={`${styles.Liimg}
                            ${pathname === '/dashboard/config' || pathname === '/dashboard/config' ? styles.activeTeste : ''}`}>
                                <Image src="/img/settings-mini.png" alt="" width={16} height={16}/>
                                Configuração
                            </li>
                        </Link>
                        <Link href="/dashboard/msgs">
                            <li onClick={() => setIsSidebarOpen(false)} className={`${styles.Liimg}
                            ${pathname === '/dashboard/msgs' || pathname === '/dashboard/msgs' ? styles.activeTeste : ''}`}>
                                <Image src="/img/msg-mini.png" alt="" width={16} height={16}/>
                                Msg de Noticação
                            </li>
                        </Link>
                        <Link href="/dashboard/whatsapp">
                            <li onClick={() => setIsSidebarOpen(false)} className={`${styles.Liimg}
                            ${pathname === '/dashboard/whatsapp' || pathname === '/dashboard/whatsapp' ? styles.activeTeste : ''}`}>
                                <Image src="/img/whatsapp-mini.png" alt="" width={16} height={16}/>
                                WhatsApp
                            </li>
                        </Link>

                        <Link href="/dashboard/clientes">
                            <li onClick={() => setIsSidebarOpen(false)} className={`${styles.Liimg}
                             ${pathname.startsWith('/dashboard/clientes') ? styles.activeTeste : ''}`}>
                                <Image src="/img/client-mini.png" alt="" width={16} height={16}/>
                                Clientes
                            </li>
                        </Link>
                    </ul>
                </nav>
            </aside>
            {isSidebarOpen && <div className={`${styles.overlay} ${styles.show}`}/>}


            <div className={styles.content}>
                <main className={styles.mainContent}>
                    {children}
                </main>
                <footer className={styles.footer}>
                    © 2025 - Todos os direitos reservados
                </footer>
            </div>
        </div>
    )


}