export function formatNumberWithCommas(number) {
  return Number(number)
    ?.toFixed(0)
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
