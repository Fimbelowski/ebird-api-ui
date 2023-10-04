import classNames from '../../utilities/classNames';

interface Props {
  align?: 'left' | 'center' | 'right';
  label: string;
}

export type { Props as TableHeaderProps };
export type TableHeaderPropsArray = Props[];

export function TableHeader({ align = 'left', label }: Props) {
  function classes() {
    return classNames(['table-header', `table-header--${align}`]);
  }

  return <th className={classes()}>{label}</th>;
}
