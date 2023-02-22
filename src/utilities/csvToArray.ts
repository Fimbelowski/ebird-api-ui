interface Header {
  defaultValue?: string;
  name: string;
}

export default function csvToArray(csv: string, headers: Header[]) {
  const rows = csv.split(/\n(?=.)/);

  return rows.map((row) => {
    const values = row.split(/(?!\B"[^"]*),(?![^"]*"\B)/g);

    const rowObject: Record<string, string> = {};

    headers.forEach(({ defaultValue, name }, index) => {
      if (index < values.length) {
        rowObject[name] = values[index];
      } else if (defaultValue === undefined) {
        throw Error(
          `No default value supplied for out of bounds index in column ${name}`
        );
      } else {
        rowObject[name] = defaultValue;
      }
    });

    return rowObject;
  });
}
