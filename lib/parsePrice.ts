export function parsePriceToCents(price: string): number {
  const cleaned = price.replace(/[^\d.]/g, "");
  const dollars = parseFloat(cleaned);
  return Math.round(dollars * 100);
}
