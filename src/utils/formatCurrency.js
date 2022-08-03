const formatCurrency = (amount) => {
  const exchangeRateRupiah = 14800; // 29 - July - 2022
  const toRupiah = +amount * exchangeRateRupiah;
  return toRupiah.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export default formatCurrency;
