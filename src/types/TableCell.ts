import { type ReactNode } from 'react';

export default interface TableCell<T> {
  align?: 'left' | 'center' | 'right';
  callback: (item: T) => string | ReactNode;
  wrap?: boolean;
}
