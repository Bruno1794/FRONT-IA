'use server'
import {GET_PAGAMENTO} from "@/functions/Api";
import {cookies} from "next/headers";
import {IClient} from "@/action/client/get-client";

export type IPagamento = {
    id: string;
    data_criado: string;
    status: number;
    valor_debito:string,
    client: IClient;

}

export default async function getPagamentos(filtro?: string, pesquisa?: string, page? : number) {

    const {url} = GET_PAGAMENTO(filtro,pesquisa, page);
    const token = await cookies();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.get('token')?.value}`
        }
    })

    const {pagamentos} = await response.json();
    return {pagamentos}

}