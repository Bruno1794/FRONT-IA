'use server'
import {DELETE_NOTICIES} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function deleteNotice(value: number) {
    const {url} = DELETE_NOTICIES(value);
    const token = await cookies();

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token.get('token')?.value}`,
        }
    })
    if (!response.ok) throw new Error(response.statusText);
}