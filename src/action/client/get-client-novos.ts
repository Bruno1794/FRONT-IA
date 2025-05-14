'use server'
import {GET_CLIENTES_NOVOS} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function getClientNovos() {
    const {url} = GET_CLIENTES_NOVOS();
    const token = await cookies();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.get('token')?.value}`
        }
    })
    const {clientes} = await response.json();
    return {clientes};
}