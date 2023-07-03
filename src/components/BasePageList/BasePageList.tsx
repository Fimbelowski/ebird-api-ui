import { useState } from 'react';

import {
  BasePage,
  type BasePageProps,
  type ResultsSection,
} from '../BasePage/BasePage';
import Pagination from '../Pagination/Pagination';

type Props = Omit<BasePageProps<string[]>, 'onLoad' | 'resultsSections'>;

export default function BasePageList(props: Props) {
  const [paginatedItems, setPaginatedItems] = useState<string[]>([]);
  const [parsedResponse, setParsedResponse] = useState<string[]>([]);

  const resultSections: ResultsSection[] = [
    {
      content: (
        <>
          <ResultsList />
          <Pagination<string>
            items={parsedResponse}
            onPaginatedItemsChange={setPaginatedItems}
          />
        </>
      ),
      title: 'Results',
    },
  ];

  function ResultsList() {
    const listItems = paginatedItems.map((item) => <li key={item}>{item}</li>);

    return <ul className="base-page-list__list">{listItems}</ul>;
  }

  return (
    <BasePage<string[]>
      {...props}
      onLoad={setParsedResponse}
      resultsSections={resultSections}
    />
  );
}
