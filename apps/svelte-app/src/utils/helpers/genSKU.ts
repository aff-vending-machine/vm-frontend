export const genSKU = (n: number) => {
  return 'CP-' + String(n + 1).padStart(5, '0');
};
