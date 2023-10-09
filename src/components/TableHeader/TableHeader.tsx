import classNames from '../../utilities/classNames';

import type { Sort, SortDirection, TableColumn } from '../Table/Table';
import TableSortControls from '../TableSortControls';

type Props<T> = Pick<TableColumn<T>, 'align' | 'label' | 'sort'> & {
  activeSort?: Sort<T>;
  activeSortDirection: SortDirection;
};

export default function TableHeader<T>({
  activeSort,
  activeSortDirection,
  align = 'left',
  label,
  sort,
}: Props<T>) {
  function classes() {
    return classNames(['table-header', `table-header--${align}`]);
  }

  return (
    <th className={classes()}>
      {label}
      {sort === undefined ? null : (
        <TableSortControls<T>
          activeSortDirection={activeSortDirection}
          sort={sort}
        />
      )}
    </th>
  );
}
