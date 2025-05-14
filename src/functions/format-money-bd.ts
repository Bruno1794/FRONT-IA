export function parseCurrencyToFloat(value: string): number {
    // Remove R$, espaço e ponto dos milhares, troca vírgula por ponto
    const cleaned = value
        .replace(/\s/g, '')        // remove espaços
        .replace('R$', '')         // remove símbolo
        .replace(/\./g, '')        // remove pontos (milhar)
        .replace(',', '.');        // troca vírgula decimal por ponto

    return parseFloat(cleaned);
}