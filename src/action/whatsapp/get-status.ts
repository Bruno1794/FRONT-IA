'use server'
import {GET_STATUS} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function getStatus() {

    const {url} = GET_STATUS();
    const token = await cookies();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.get('token')?.value}`,
        }
    })
    const {status} = await response.json();
    return {status}
}