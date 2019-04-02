export function strToLowercase(str) {
  return str.replace(/\s+/g, '-').toLowerCase();
}

export function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}