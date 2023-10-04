import classNames from '../../utilities/classNames';
import type { TableColumn } from '../Table/Table';

type Props<T> = Omit<TableColumn<T>, 'label'> & { item: T };

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
