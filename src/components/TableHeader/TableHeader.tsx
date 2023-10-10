import type { ReactNode } from 'react';

import classNames from '../../utilities/classNames';

import type { TableColumn } from '../Table/Table';

type Props<T> = Pick<TableColumn<T>, 'align' | 'label' | 'sort'> & {
  sortControls?: ReactNode;
};

export default function TableHeader<T>({
  align = 'left',
  label,
  sortControls,
}: Props<T>) {
  function classes() {
    return classNames(['table-header', `table-header--${align}`]);
  }

  return (
    <th className={classes()}>
      {label}
      {sortControls}
    </th>
  );
}
