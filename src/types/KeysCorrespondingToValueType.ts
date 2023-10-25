type KeysCorrespondingToValueType<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

type KeysCorrespondingToNumericValues<T> = KeysCorrespondingToValueType<
  T,
  number
>;

export type { KeysCorrespondingToValueType, KeysCorrespondingToNumericValues };
