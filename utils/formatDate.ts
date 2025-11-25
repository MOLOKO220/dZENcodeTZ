export function formatDate(date: string, format: number) {
  const d = new Date(date);
  const DD = d.getDate().toString().padStart(2, "0");
  const MM = (d.getMonth() + 1).toString().padStart(2, "0");
  const YYYY = d.getFullYear();

  if (format === 1) return `${DD}/${MM}/${YYYY}`;
  if (format === 2)
    return `${DD}/${d.toLocaleString("ru", { month: "long" })}/${YYYY}`;
  if (format === 3) return `${DD}/${MM}`;

  return "";
}
