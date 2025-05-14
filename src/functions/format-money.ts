export function formatMoneyInput(input: string): string {
    const cleaned = input.replace(/\D/g, '');
    const number = Number(cleaned) / 100;

    return number.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}