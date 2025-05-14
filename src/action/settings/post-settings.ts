'use server'
import {cookies} from "next/headers";
import {POST_SETTINGS} from "@/functions/Api";

export default async function postSettings(state: object, formData: FormData) {


    const {url} = POST_SETTINGS();
    const token = await cookies();

    try {
        const settigs = {
            time_cobranca: formData.get('time_cobranca') as string,
            cadastro: Boolean(formData.get('cadastro')),
            notificar: Boolean(formData.get('notificar')),
            envio: Boolean(formData.get('envio')),
            padrao: Boolean(formData.get('padrao')),
            msg_padrao: formData.get('msg') as string,
        }
        console.log(JSON.stringify(settigs));

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.get('token')?.value}`
            },
            body: JSON.stringify(settigs),
        })

        const data = await response.json();
        console.log(data)
        return {ok: true, error: '', data: null}

    } catch (error) {
        return {error: error};
    }
}