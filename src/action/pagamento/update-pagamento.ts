'use server'
import {UPDATE_PAGAMENTO} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function updatePagamento(value: number) {

    const {url} = UPDATE_PAGAMENTO(value);
    const token = await cookies();

   const response =  await fetch(url, {
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${token.get('token')?.value}`

        }
    })
    if (!response.ok) {
        throw new Error(`Erro ao deletar cliente: ${response.statusText}`);
    }

}