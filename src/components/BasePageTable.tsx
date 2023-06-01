import { useState } from 'react';

import { BasePage, type BasePageProps } from './BasePage';
import Details from './Details/Details';
import { Table, type TableProps } from './Table/Table';

type ModifiedTableProps<T> = Omit<TableProps<T>, 'items'> & {
  open?: boolean;
  title: string;
};

export type Tables<T> = Array<ModifiedTableProps<T>>;

export type BasePageTableProps<T> = Omit<
  BasePageProps<T[]>,
  'onLoad' | 'resultsContent'
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

  function onLoad(results: T[]) {
    if (onLoadProp !== undefined) {
      onLoadProp(results);
    }

    setParsedResults(results);
  }

  const resultsContent = () => {
    const listItems = tables.map(({ cells, headers, open = false, title }) => (
      <Details
        key={title}
        open={open}
        summary={title}
      >
        <Table<T>
          cells={cells}
          headers={headers}
          items={parsedResults}
        />
      </Details>
    ));

    return listItems;
  };

  return (
    <BasePage<T[]>
      {...rest}
      onLoad={onLoad}
      resultsContent={resultsContent()}
    />
  );
}
