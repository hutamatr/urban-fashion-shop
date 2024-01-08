export function formatCurrencyToFixed(amount: number) {
  return amount?.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
}

export function capitalizeWords(words: string) {
  return words?.replace(/(?:^|\s)\S/g, (word) => word.toUpperCase());
}
