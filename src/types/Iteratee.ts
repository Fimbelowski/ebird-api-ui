import type KeysCorrespondingToValueType from './KeysCorrespondingToValueType';

type Iteratee<T, V> = KeysCorrespondingToValueType<T, V> | ((item: T) => V);

export default Iteratee;
