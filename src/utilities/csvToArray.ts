export default function csvToArray<T>(
  csv: string,
  headers: Array<keyof T>,
  ignoreFirstLine = false
): T[] {
  const rows = csv.split(/\n(?=.)/);

  if (ignoreFirstLine) {
    rows.shift();
  }

  return rows.map((row) => {
    const values = row.split(/(?!\B"[^"]*),(?![^"]*"\B)/g);

    const rowObject: Partial<Record<keyof T, string>> = {};

    headers.forEach((header, index) => {
      rowObject[header] = values[index];
    });

    return rowObject as T;
  });
}
