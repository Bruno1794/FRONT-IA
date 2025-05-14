'use server'
import {POST_NOTICIES} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function postNotices(state: object, formData: FormData) {
    const {url} = POST_NOTICIES();
    const token = await cookies();

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token.get('token')?.value}`},
            body: formData
        })

        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();

        return {ok: data.success, error: '', data: null}

    } catch (error) {
        return {error: error}
    }

}