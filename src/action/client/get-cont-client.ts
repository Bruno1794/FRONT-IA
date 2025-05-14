'use server'
import {GET_CONT_CLIENT} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function geContClient(filtro:string) {

    const {url} = GET_CONT_CLIENT(filtro);
    const token = await cookies();

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.get('token')?.value}`
        }
    })
    const {clientes} = await response.json();

    return {clientes};
}