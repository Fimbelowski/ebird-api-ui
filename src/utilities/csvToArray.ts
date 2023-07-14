type KeyToTransformerLookup<T> = {
  [K in keyof T as T[K] extends string ? never : K]: (
    stringValue: string
  ) => T[K];
};

export default function csvToArray<T>(
  csv: string,
  keys: Array<keyof T>,
  keyToTransformerLookup: KeyToTransformerLookup<T>,
  ignoreFirstLine = false
): T[] {
  const rows = csv.split(/\n(?=.)/);

  if (ignoreFirstLine) {
    rows.shift();
  }

  return rows.map((row, index) => {
    const alteredRow = row.replaceAll(/"([^"])*"/g, (match) =>
      ' '.repeat(match.length)
    );

    const commaIndices = Array.from(alteredRow.matchAll(/,/g)).map(
      ({ index }) => index as number
    );

    const values = [
      row.slice(0, commaIndices[0]),
      ...commaIndices.map((commaIndex, index) =>
        row.slice(commaIndex + 1, commaIndices[index + 1])
      ),
    ];

    const rowObject: Partial<Record<keyof T, any>> = {};

    keys.forEach((key, index) => {
      const stringValue = values[index];

      if (key in keyToTransformerLookup) {
        rowObject[key] =
          keyToTransformerLookup[key as keyof KeyToTransformerLookup<T>](
            stringValue
          );
        return;
      }

      rowObject[key] = stringValue;
    });

    return rowObject as T;
  });
}
