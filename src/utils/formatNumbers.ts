export function removeSign(value: string | undefined): number {
  if (!value) return 0;
  return parseFloat(value.replace(/[^\d.-]/g, ""));
}

export const formatNumber = (
  value: number | string | null | undefined,
): string => {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  const number =
    typeof value === "string" ? Number(value.replace(/,/g, "")) : value;

  if (Number.isNaN(number)) {
    return "";
  }

  return number.toLocaleString("en-US");
};
