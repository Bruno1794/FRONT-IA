'use server'
import {POST_CLIENTES} from "@/functions/Api";
import {cookies} from "next/headers";
import {parseCurrencyToFloat} from "@/functions/format-money-bd";

export default async function postClient(state: object, formData: FormData) {

    const {url} = POST_CLIENTES();
    const token = await cookies();

    //console.log(formData);
    function onlyNumbers(value: string): string {
        return value.replace(/\D/g, '');
    }

    try {

        const client = {
            name: formData.get('name') as string,
            cpf: onlyNumbers(formData.get('cpf') as string),
            phone: onlyNumbers(formData.get('phone') as string),
            email: formData.get('email') as string,
            vencimento: formData.get('vencimento') as string,
            value_mensalidade: parseCurrencyToFloat(formData.get('value_mensalidade') as string),
            avisar: formData.get('avisar') as string,
            referencia: formData.get('referencia') as string,
            type_cobranca: formData.get('type_cobranca') as string,
            observation: formData.get('observation') as string,
            preferencia: formData.get('preferencia') as string,
            cobrar: Boolean(formData.get('cobrar')),
        }


        const respose = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.get('token')?.value}`
            },
            body: JSON.stringify(client)
        })
        if (!respose.ok) {
            throw new Error(`Erro ao deletar cliente: ${respose.statusText}`);
        }

        return {ok: true, error: '', data: null}
    } catch (error) {
        return {error: error};
    }

}