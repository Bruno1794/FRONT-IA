'use server'

import {GET_PAGAMENTOS} from "@/functions/Api";
import {cookies} from "next/headers";

export type IPagamentos = {
    id: number;
    data_criado: string;
    status: string;
    valor_debito: string;
    tipo_pagamento: string;
    tipo_transacao: string;
    data_pagamento: string;
    observation: string;


}
export default async function getPagamentos(value: number, pesquisa?: string,page?: number) {

    const {url} = GET_PAGAMENTOS(value, pesquisa, page);
    const token = await cookies()

    const response = await fetch(url, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token.get('token')?.value}`},
    })

    const {payments} = await response.json()
    return {payments};


}