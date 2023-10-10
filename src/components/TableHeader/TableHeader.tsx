import classNames from '../../utilities/classNames';

import type { Sort, SortDirection, TableColumn } from '../Table/Table';
import TableSortControls from '../TableSortControls';

type BaseProps<T> = Pick<TableColumn<T>, 'align' | 'label'>;

type SortProps<T> = Required<Pick<TableColumn<T>, 'sort'>> & {
  activeSort: Sort<T> | undefined;
  activeSortDirection: SortDirection;
  onSortClick: (sort: Sort<T>) => void;
};

type Props<T> = BaseProps<T> | (BaseProps<T> & SortProps<T>);

// type Props<T> = Pick<TableColumn<T>, 'align' | 'label' | 'sort'> & {
//   activeSort: Sort<T> | undefined;
//   activeSortDirection: SortDirection;
//   onSortClick?: (sort: Sort<T>) => void;
// };

export default function TableHeader<T>({
  activeSort,
  activeSortDirection,
  align = 'left',
  onSortClick,
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
          onClick={onSortClick}
          sort={sort}
        />
      )}
    </th>
  );
}
