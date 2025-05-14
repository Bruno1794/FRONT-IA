'use client'
import styles from './whats.module.css'
import React from "react";
import getStatus from "@/action/whatsapp/get-status";
import getQrcode from "@/action/whatsapp/post-qrcode";
import Image from "next/image";

export default function WhasPage() {
    const [qrCode, setQrCode] = React.useState<string | null>(null);
    const [connected, setConnected] = React.useState(false);

    React.useEffect(() => {

        const interval = setInterval(async () => {
            try {
                const {status} = await getStatus();

                if (status === "Ready") {
                    setConnected(true);
                    setQrCode(null);
                    clearInterval(interval);
                } else {
                    const {img} = await getQrcode();
                    setQrCode(img);
                }
            } catch (err) {
                console.error('Erro ao buscar status:', err);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    return (
        <section className="conteiner">
            <h1>Conexão com WhatsApp</h1>
            {connected ? (
                <div>
                    <p>✅ WhatsApp está conectado <br/>
                        Para desconectar basta remover a conexao em seu celular
                    </p>
                    <br/>
                    <Image src="/img/conectado.gif" alt="" width={350} height={350}
                    className={styles.imgGif}/>

                </div>


            ) : qrCode ? (
                <img src={qrCode} alt="QR Code" style={{width: 300, height: 300}}/>
            ) : (
                <p>Carregando QR Code...</p>
            )}

        </section>
    )
}