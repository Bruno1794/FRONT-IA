'use server'
import {POST_LOGIN} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function postLogin(state: object, formData: FormData) {
    const {url} = POST_LOGIN();

    try {

        const response = await fetch(url, {
            method: 'POST',
            body: formData
        })
        const data = await response.json()

        if (!data.success) throw new Error(data.message);

        const cookie = await cookies();

        cookie.set('token', data.token, {
            httpOnly: true,
            secure: true,
        });

        return {ok: true, error: '', data: null}

    } catch (error) {
        return {error: error};
    }

}