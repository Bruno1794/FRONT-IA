//export const API_URL = "http://localhost:8000/api";
export const API_URL = "https://api.codeacode.com.br/api";

export function POST_LOGIN() {
    return {
        url: API_URL + '/login',

    };

}
export function GET_USER() {
    return {
        url: API_URL + '/usuarios',

    };

}

export function GET_SETTINGS() {
    return {
        url: API_URL + '/settings',

    };

}

export function POST_SETTINGS() {
    return {
        url: API_URL + '/settings',

    };

}

export function POST_QRCODE() {
    return {
        url: API_URL + '/qrcode',

    };

}

export function GET_STATUS() {
    return {
        url: API_URL + '/status',

    };

}

export function GET_CLIENTES(page: number, pesquisa?: string, filtro?: string) {
    return {
        url: API_URL + `/clientes?page=${page}&pesquisa=${pesquisa}&filtro=${filtro}`,

    };

}

export function GET_CLIENTES_NOVOS() {
    return {
        url: API_URL + `/lista-novos-clientes`,

    };

}
export function  GET_CONT_CLIENT(filtro:string) {
    return {
        url: API_URL + `/contagem?filtro=${filtro}`,

    };

}

export function POST_CLIENTES() {
    return {
        url: API_URL + '/novo-cliente',

    };

}

export function SHOW_CLIENTES(value: number) {
    return {
        url: API_URL + `/clientes/${value}`,

    };

}
export function PUT_CLIENTES(value: number) {
    return {
        url: API_URL + `/clientes/${value}`,

    };

}

export function PUT_ATIVA(value: number) {
    return {
        url: API_URL + `/ativar-cleinte/${value}`,

    };

}
export function DELETE_CLIENTE(value: number) {
    return {
        url: API_URL + `/cleintes-delete/${value}`,

    };

}

export function PUT_RENOVAR(value: number) {
    return {
        url: API_URL + `/renovar/${value}`,

    };

}
export function GET_PAGAMENTOS(value: number, pesquisa?: string, page?: number) {
    return {
        url: API_URL + `/payments/${value}?pesquisa=${pesquisa}&page=${page}`,

    };

}
export function  GET_DADOS_PAGAMENTO(filtro:string) {
    return {
        url: API_URL + `/pagamentos-dados?filtro=${filtro}`,

    };

}
export function PUT_STATUS(value: number) {
    return {
        url: API_URL + `/update-status/${value}`,

    };

}

export function GET_PAGAMENTO(value?: string, pesquisa?: string, page?: number) {
    return {
        url: API_URL + `/pagamentos?filtro=${value}&pesquisa=${pesquisa}&page=${page}`,

    };

}


export function UPDATE_PAGAMENTO(value: number) {
    return {
        url: API_URL + `/pagamentos/${value}`,

    };

}

export function DELETE_PAGAMENTO(value: number) {
    return {
        url: API_URL + `/pagamentos/${value}`,

    };

}

export function GET_NOTICIES(pesquisa?: string, page?: number) {
    return {
        url: API_URL + `/noficacoes?pesquisa=${pesquisa}&page=${page}`,

    };

}
export function DELETE_NOTICIES(value: number) {
    return {
        url: API_URL + `/noficacoes/${value}`,

    };

}
export function POST_NOTICIES() {
    return {
        url: API_URL + `/noficacoes`,

    };

}
export function SHOW_NOTICIES(value: number) {
    return {
        url: API_URL + `/noficacoes/${value}`,

    };

}
export function PUT_NOTICIES(value: number) {
    return {
        url: API_URL + `/noficacoes/${value}`,

    };

}
