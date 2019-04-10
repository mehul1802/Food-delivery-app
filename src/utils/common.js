export function strToLowercase(str) {
  return str.replace(/\s+/g, '-').toLowerCase();
}

export function formatPrice(price) {
  if (price == null) {
    return '';
  }

  const symbol = '$';
  const amount = Math.abs(price).toFixed(2);
  const sign = price < 0 ? '-' : '';
  return `${sign}${symbol}${amount}`;
}

export function formatAmount(amount) {
  return Number(Math.abs(amount).toFixed(2));
}