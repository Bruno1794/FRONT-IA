'use server'
import {PUT_RENOVAR} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function postRenovar(state: object, formData: FormData) {
    const {url} = PUT_RENOVAR(Number(formData.get('id')))
    const token = await cookies();


    try {
        const renew = {
            gerar_cobranca: Boolean(formData.get('gerar_cobranca')),
            tipo_pagamento: formData.get('tipo_pagamento') as string,
            observation: formData.get('observation') as string,
        }

        console.log(JSON.stringify(renew));
        const reponse = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token.get('token')?.value}`
            },
            body: JSON.stringify(renew)
        })
        if (!reponse.ok) {
            throw new Error(`Erro ao deletar cliente: ${reponse.statusText}`);
        }
        return {ok: true, error: '', data: null}
    } catch (error) {
        return {error: error};
    }

}