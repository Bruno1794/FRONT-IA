'use server'
import {PUT_NOTICIES} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function putNotices(state: object, formData: FormData) {

    const {url} = PUT_NOTICIES(Number(formData.get('id')));
    const token = await cookies();

    try {
        const notice = {
            day: formData.get('day'),
            message: formData.get('message'),
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.get('token')?.value}`
            },
            body: JSON.stringify(notice)
        })
        console.log(response)
        if (!response.ok) throw new Error(response.statusText);
        return {ok: true, error: '', data: null}

    } catch (error) {
        return {error: error};

    }
}