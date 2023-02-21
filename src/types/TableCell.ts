import type CallbackCell from './CallbackCell';
import type KeyCell from './KeyCell';

type TableCell<T> = CallbackCell<T> | KeyCell<T>;

export default TableCell;
