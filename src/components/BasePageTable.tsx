import { useState } from 'react';

import {
  BasePage,
  type BasePageProps,
  type ResultsSection,
} from './BasePage/BasePage';
import { Table, type TableProps } from './Table/Table';

type ModifiedTableProps<T> = Omit<TableProps<T>, 'items'> & {
  title: string;
};

export type Tables<T> = Array<ModifiedTableProps<T>>;

export type BasePageTableProps<T> = Omit<
  BasePageProps<T[]>,
  'onLoad' | 'resultsSections'
> & {
  onLoad?: (results: T[]) => void;
  tables: Array<ModifiedTableProps<T>>;
};

export function BasePageTable<T>({
  onLoad: onLoadProp,
  tables,
  ...rest
}: BasePageTableProps<T>) {
  const [parsedResults, setParsedResults] = useState<T[]>([]);

  const resultsSections: ResultsSection[] = tables.map(
    ({ columns, title }) => ({
      content: (
        <Table<T>
          columns={columns}
          items={parsedResults}
          key={title}
        />
      ),
      open,
      title,
    })
  );

  function onLoad(results: T[]) {
    if (onLoadProp !== undefined) {
      onLoadProp(results);
    }

    setParsedResults(results);
  }

  return (
    <BasePage<T[]>
      {...rest}
      onLoad={onLoad}
      resultsSections={resultsSections}
    />
  );
}
