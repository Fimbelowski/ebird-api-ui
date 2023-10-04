import type { ReactNode } from 'react';

import classNames from '../../utilities/classNames';

interface Props<T> {
  align?: 'left' | 'center' | 'right';
  callback: (item: T) => string | ReactNode;
  item: T;
  wrap?: boolean;
}

export type TableCellConfig<T> = Omit<Props<T>, 'item'>;
export type TableCellConfigArray<T> = Array<TableCellConfig<T>>;

export function TableCell<T>({
  align = 'left',
  callback,
  item,
  wrap = false,
}: Props<T>) {
  function classes() {
    return classNames([
      'table-cell',
      `table-cell--${align}`,
      { 'table-cell--wrap': wrap },
    ]);
  }

  return <td className={classes()}>{callback(item)}</td>;
}
