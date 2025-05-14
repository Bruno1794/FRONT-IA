'use server'
import {POST_QRCODE} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function getQrcode() {

    const {url} = POST_QRCODE();
    const token = await cookies();

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.get('token')?.value}`,
        }
    })
    const {img} = await response.json();
    return {img}
}