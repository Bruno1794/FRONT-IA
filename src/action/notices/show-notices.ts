'use server'
import {GET_NOTICIES, SHOW_NOTICIES} from "@/functions/Api";
import {cookies} from "next/headers";


export default async function showNotices(value:number) {

    const {url} = SHOW_NOTICIES(value);
    const token = await cookies();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.get('token')?.value}`
        }
    })
    const {notice} = await response.json();
    return {notice}
}