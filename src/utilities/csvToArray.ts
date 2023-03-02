export default function csvToArray(
  csv: string,
  headers: string[],
  ignoreFirstLine = false
) {
  const rows = csv.split(/\n(?=.)/);

  if (ignoreFirstLine) {
    rows.splice(0, 1);
  }

  console.log(rows);

  return rows.map((row) => {
    const values = row.split(/(?!\B"[^"]*),(?![^"]*"\B)/g);

    const rowObject: Record<string, string> = {};

    headers.forEach((header, index) => {
      rowObject[header] = values[index];
    });

    return rowObject;
  });
}
