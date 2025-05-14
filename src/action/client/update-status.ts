'use server'
import {PUT_STATUS} from "@/functions/Api";
import {cookies} from "next/headers";
import {parseCurrencyToFloat} from "@/functions/format-money-bd";

export default async function updateStatus(status: object, formData: FormData) {
    const {url} = PUT_STATUS(Number(formData.get('id')))
    const token = await cookies();
    console.log(formData);


    try {

        const status = {
            status: (formData.get('status') as string) ?? '',
            vencimento: (formData.get('vencimento') as string) ?? '',
            value_mensalidade: parseCurrencyToFloat((formData.get('value_mensalidade') as string) ?? '0'),
            type_cobranca: (formData.get('type_cobranca') as string) ?? '',
            gerar_cobranca: Boolean(formData.get('gerar_cobranca')),
        };



        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token.get('token')?.value}`
            },
            body: JSON.stringify(status)
        })
        if (!response.ok) {
            throw new Error(`Erro ao deletar cliente: ${response.statusText}`);
        }


        return {ok: true, error: '', data: null}

    } catch (error) {
        return {error: error};
    }


}