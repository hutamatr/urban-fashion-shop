export const formatCurrency = (amount) => {
  const exchangeRateRupiah = 15500; // 20 - Dec - 2022
  const toRupiah = +amount * exchangeRateRupiah;
  return toRupiah.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const formatCurrencyOnly = (amount) => {
  const exchangeRateRupiah = 15000;
  return +amount * exchangeRateRupiah;
};

export const formatCurrencyToFixed = (amount) => {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
