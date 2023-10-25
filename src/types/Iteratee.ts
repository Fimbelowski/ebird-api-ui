import type { KeysCorrespondingToValueType } from './KeysCorrespondingToValueType';

type Iteratee<T, V> = KeysCorrespondingToValueType<T, V> | ((item: T) => V);

type NumericIteratee<T> = Iteratee<T, number>;

export type { Iteratee, NumericIteratee };
