'use server'
import {DELETE_PAGAMENTO} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function deletePagamento(value: number) {

    const {url} = DELETE_PAGAMENTO(value);
    const token = await cookies();

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${token.get('token')?.value}`

        }
    })
    if (!response.ok) {
        throw new Error(`Erro ao deletar cliente: ${response.statusText}`);
    }

}