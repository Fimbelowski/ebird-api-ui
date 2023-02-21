export default function csvToArray(csv: string, headers: string[]) {
  const rows = csv.split(/\n(?=.)/);

  return rows.map((row) => {
    const values = row.split(/(?!\B"[^"]*),(?![^"]*"\B)/g);

    if (values.length !== headers.length) {
      throw Error('Lengths of headers and actual values do not match.');
    }

    const rowObject: Record<string, string> = {};

    values.forEach((value, index) => {
      const header = headers[index];
      rowObject[header] = value;
    });

    return rowObject;
  });
}
