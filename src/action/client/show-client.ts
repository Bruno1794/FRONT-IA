'use server'
import {SHOW_CLIENTES} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function showClient(value: number) {
    const {url} = SHOW_CLIENTES(value);
    const token = await cookies();

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.get('token')?.value}`
        }
    });
    const {client} = await response.json();
    return {client}
}