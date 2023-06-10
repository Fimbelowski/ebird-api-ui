export default function csvToArray<T>(
  csv: string,
  keys: Array<keyof T>,
  ignoreFirstLine = false
): T[] {
  const rows = csv.split(/\n(?=.)/);

  if (ignoreFirstLine) {
    rows.shift();
  }

  return rows.map((row) => {
    const values = row.split(/(?!\B"[^"]*),(?![^"]*"\B)/g);

    const rowObject: Partial<Record<keyof T, string>> = {};

    keys.forEach((key, index) => {
      rowObject[key] = values[index];
    });

    return rowObject as T;
  });
}
