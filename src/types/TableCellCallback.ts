import { type ReactNode } from 'react';

type TableCellCallback<T> = (item: T) => string | ReactNode;

export default TableCellCallback;
