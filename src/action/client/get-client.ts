'use server'
import { GET_CLIENTES } from "@/functions/Api";
import { cookies } from "next/headers";

export type IClient = {
    id: string;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    status: string;
    type_client: string;
    cobrar: string;
    vencimento: string;
    value_mensalidade: string;
    msg_enviar: string;
    type_cobranca: string;
    referencia: string;
    preferencia: string;
};

async function getAuthToken(): Promise<string | undefined> {
    const token = await cookies();
    return token.get('token')?.value;
}

export default async function getClient(page = 1, pesquisa?: string, filtro?: string) {
    try {
        const { url } = GET_CLIENTES(page, pesquisa, filtro);
        const authToken = await getAuthToken();

        if (!authToken) {
            throw new Error("Token não encontrado");
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const { clientes } = await response.json();
        return { clientes };
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        return { clientes: [] };
    }
}
