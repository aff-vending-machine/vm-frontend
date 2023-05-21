export const genSKU = (n: number) => {
    return 'P' + String(n + 1).padStart(6, '0');
}