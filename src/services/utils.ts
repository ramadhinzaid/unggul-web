export function formatCurrency(data: number | string): string {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "IDR",
  };
  return Intl.NumberFormat("id", options).format(Number(data));
}
