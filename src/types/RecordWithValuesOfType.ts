import type { KeysCorrespondingToValueType } from './KeysCorrespondingToValueType';

type RecordWithValuesOfType<T, V> = Record<
  KeysCorrespondingToValueType<T, V>,
  V
>;

type RecordWithNumericValues<T> = RecordWithValuesOfType<T, number>;

export type { RecordWithNumericValues, RecordWithValuesOfType };
