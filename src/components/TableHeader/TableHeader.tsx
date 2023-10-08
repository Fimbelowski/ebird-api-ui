import classNames from '../../utilities/classNames';

import type { TableColumn } from '../Table/Table';

type Props<T> = Pick<TableColumn<T>, 'align' | 'label'>;

export default function TableHeader<T>({ align = 'left', label }: Props<T>) {
  function classes() {
    return classNames(['table-header', `table-header--${align}`]);
  }

  return <th className={classes()}>{label}</th>;
}
