export function formatPhone(phone: string): string {
    // Remove tudo que não é número
    let cleaned = phone.replace(/\D/g, '');

    // Remove o código do país "55" se estiver no início
    if (cleaned.startsWith('55')) {
        cleaned = cleaned.slice(2);
    }

    // Se tem DDD + número com 9 dígitos (celular)
    if (cleaned.length === 11) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }

    // Se tem DDD + número com 8 dígitos (fixo)
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }

    // Se não tem DDD mas tem 9 dígitos
    if (cleaned.length === 9) {
        return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }

    // Se não tem DDD e tem 8 dígitos
    if (cleaned.length === 8) {
        return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    }

    // Se não reconhecido, retorna como está
    return phone;
}
