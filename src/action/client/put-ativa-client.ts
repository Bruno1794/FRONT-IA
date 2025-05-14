'use server'
import {PUT_ATIVA} from "@/functions/Api";
import {cookies} from "next/headers";
import {parseCurrencyToFloat} from "@/functions/format-money-bd";

export default async function ativaClient(state: object, formData: FormData) {

    const {url} = PUT_ATIVA(Number(formData.get('id')));
    const token = await cookies();
    console.log(url);


    try {
        const cliente = {
            name: formData.get('name'),
            referencia: formData.get('referencia'),
            type_cobranca: formData.get('type_cobranca'),
            vencimento: formData.get('vencimento'),
            value_mensalidade: parseCurrencyToFloat(formData.get('value_mensalidade') as string),
        }
        console.log(JSON.stringify(cliente));
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.get('token')?.value}`
            },
            body: JSON.stringify(cliente)
        })

        if (!response.ok) {
            throw new Error(`Erro ao deletar cliente: ${response.statusText}`);
        }
        return {ok: true, error: '', data: null}

    } catch (error) {
        return {error: error};
    }
}