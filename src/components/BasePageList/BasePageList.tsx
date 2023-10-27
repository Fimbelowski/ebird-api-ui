import { useState } from 'react';

import {
  BasePage,
  type BasePageProps,
  type ResultsSection,
} from '../BasePage/BasePage';
import Pagination from '../Pagination/Pagination';
import usePagination from '../../hooks/usePagination';

type Props = Omit<BasePageProps<string[]>, 'onLoad' | 'resultsSections'>;

export default function BasePageList(props: Props) {
  const [parsedResponse, setParsedResponse] = useState<string[]>([]);

  const { getPaginatedItems, itemsPerPage, page, setItemsPerPage, setPage } =
    usePagination(parsedResponse);

  const resultSections: ResultsSection[] = [
    {
      content: (
        <>
          <ResultsList />
          <Pagination
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            onPageChange={setPage}
            page={page}
            totalItems={parsedResponse.length}
          />
        </>
      ),
      title: 'Results',
    },
  ];

  function ResultsList() {
    const listItems = getPaginatedItems(parsedResponse).map((item) => (
      <li key={item}>{item}</li>
    ));

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
