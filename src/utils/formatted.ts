export function formatCurrencyToFixed(amount: number) {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function capitalizeWords(words: string) {
  return words.replace(/(?:^|\s)\S/g, (word) => word.toUpperCase());
}
