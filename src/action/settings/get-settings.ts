'use server'
import {GET_SETTINGS} from "@/functions/Api";
import {cookies} from "next/headers";
export type IConfig = {
    time_cobranca: string;
}
export async function getSettings() {

    const {url} = GET_SETTINGS();
    const token = await cookies()
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token.get('token')?.value}`
        }
    });
    const {data} = await response.json();
    return {data}

}