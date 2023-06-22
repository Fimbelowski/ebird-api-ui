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

  return rows.map((row) => {
    const values = row.split(/(?!\B"[^"]*),(?![^"]*"\B)/g);

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
