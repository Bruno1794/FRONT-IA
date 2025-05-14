'use client'
import styles from './login.module.css'
import React from "react";
import postLogin from "@/action/login/post-login";
import {redirect} from "next/navigation";

export default function Login() {

    const [state, action] = React.useActionState(postLogin, {
        ok: false,
        error: '',
        data: null
    });

    if (state.ok) {
        redirect('/dashboard');
    }


    return (
        <section className={styles.sectionLogin}>
            <div className={styles.login}>
                <h1>CodeClientes</h1>
                <form action={action}>
                    <input type="text" placeholder="Usuario" name="username"/>
                    <input type="password" placeholder="Senha" name="password"/>
                    <button className="btnPadrao">Entrar</button>
                </form>
            </div>
        </section>
    );
}
