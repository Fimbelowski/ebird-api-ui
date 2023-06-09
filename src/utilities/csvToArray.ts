export default function csvToArray<T>(
  csv: string,
  headers: string[],
  ignoreFirstLine = false
): T[] {
  const rows = csv.split(/\n(?=.)/);

  if (ignoreFirstLine) {
    rows.shift();
  }

  return rows.map((row) => {
    const values = row.split(/(?!\B"[^"]*),(?![^"]*"\B)/g);

    const rowObject: Record<string, string> = {};

    headers.forEach((header, index) => {
      rowObject[header] = values[index];
    });

    return rowObject;
  }) as T[];
}
