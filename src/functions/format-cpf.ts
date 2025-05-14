export function formatCPF(cpf: string | null | undefined): string {
    if (!cpf) return ''; // Retorna string vazia se for null ou undefined
    return cpf.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}