'use server'
import {DELETE_CLIENTE} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function deleteClient(id: number) {
    const {url} = DELETE_CLIENTE(id)
    const token = await cookies();

    const response = await fetch(url,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token.get('token')?.value}`
        }
    })
    if (!response.ok) {
        throw new Error(`Erro ao deletar cliente: ${response.statusText}`);
    }
}