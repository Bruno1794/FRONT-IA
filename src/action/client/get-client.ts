'use server'
import {GET_CLIENTES} from "@/functions/Api";
import {cookies} from "next/headers";

export type IClient = {
    id: string;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    status: string;
    type_client: string;
    cobrar: string;
    vencimento: string;
    value_mensalidade: string;
    msg_enviar: string;
    type_cobranca: string;
    referencia: string;
    preferencia: string;

}
export default async function getClient(page = 1, pesquisa?: string, filtro?: string) {

    const {url} = GET_CLIENTES(page, pesquisa, filtro);
    const token = await cookies();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.get('token')?.value}`
        }
    })
    const {clientes} = await response.json();
    return {clientes}


}