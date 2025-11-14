export function formatCurrency(
  data: number | string,
  numberOnly?: boolean,
  otherOptions?: Intl.NumberFormatOptions
): string {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    ...otherOptions,
  };
  return Intl.NumberFormat("id", numberOnly ? undefined : options).format(
    Number(data)
  );
}
