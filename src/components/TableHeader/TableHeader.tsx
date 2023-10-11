import type { ReactNode } from 'react';

import classNames from '../../utilities/classNames';

import type { TableColumn } from '../Table/Table';

type Props<T> = Pick<TableColumn<T>, 'align' | 'label'> & {
  sortControls?: ReactNode;
  stretch?: boolean;
};

export default function TableHeader<T>({
  align = 'left',
  label,
  sortControls,
  stretch = false,
}: Props<T>) {
  function classes() {
    return classNames([
      'table-header',
      `table-header--${align}`,
      { 'table-header--stretch': stretch },
    ]);
  }

  return (
    <th className={classes()}>
      <div className="table-header__content">
        {label}
        {sortControls}
      </div>
    </th>
  );
}
