'use server'
import {GET_NOTICIES} from "@/functions/Api";
import {cookies} from "next/headers";

export type INotice = {
    id: string;
    day: number;
    message: string;
}
export default async function getNotices(value:string, page?: number) {

    const {url} = GET_NOTICIES(value, page);
    const token = await cookies();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.get('token')?.value}`
        }
    })
    const {data} = await response.json();
    return {data}
}