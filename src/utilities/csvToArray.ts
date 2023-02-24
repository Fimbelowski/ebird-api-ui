export default function csvToArray(csv: string, headers: string[]) {
  const rows = csv.split(/\n(?=.)/);

  return rows.map((row) => {
    const values = row.split(/(?!\B"[^"]*),(?![^"]*"\B)/g);

    const rowObject: Record<string, string> = {};

    headers.forEach((header, index) => {
      rowObject[header] = values[index];
    });

    return rowObject;
  });
}
