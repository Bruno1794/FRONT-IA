'use server'
import {GET_DADOS_PAGAMENTO} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function getDadosPagamentos(value: string) {

    const {url} = GET_DADOS_PAGAMENTO(value);
    const token = await cookies();

    const response = await fetch(url, {
        method: 'get',
        headers: {
            'authorization': `Bearer ${token.get('token')?.value}`

        }
    })

    const {pagamentos} =  await response.json()
    return{pagamentos}

}