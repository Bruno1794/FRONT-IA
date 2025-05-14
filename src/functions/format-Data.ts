export function formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00'); // força horário local

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // meses vão de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}