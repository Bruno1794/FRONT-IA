
export function formatMoneySemSifra(input: string): string {
    const cleaned = input.replace(/\D/g, ''); // Remove tudo que não for número
    const number = Number(cleaned) / 100;  // Converte para o número com a vírgula como separador decimal

    // Formata o número para moeda, mas sem o símbolo 'R$'
    return number.toLocaleString('pt-BR', {
        minimumFractionDigits: 2, // Garante 2 casas decimais
        maximumFractionDigits: 2,
    });
}