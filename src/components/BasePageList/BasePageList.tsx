import { useState } from 'react';

import { BasePage, type BasePageProps } from '../BasePage/BasePage';
import Details from '../Details/Details';
import Pagination from '../Pagination/Pagination';

type Props = Omit<BasePageProps<string[]>, 'onLoad' | 'resultsContent'>;

export default function BasePageList(props: Props) {
  const [paginatedItems, setPaginatedItems] = useState<string[]>([]);
  const [parsedResponse, setParsedResponse] = useState<string[]>([]);

  function ResultsList() {
    const listItems = paginatedItems.map((item) => <li key={item}>{item}</li>);

    return <ul className="base-page-list__list">{listItems}</ul>;
  }

  const resultsContent = (
    <Details
      open
      summary="Results"
    >
      <ResultsList />
      <Pagination<string>
        items={parsedResponse}
        onPaginatedItemsChange={setPaginatedItems}
      />
    </Details>
  );

  return (
    <BasePage<string[]>
      {...props}
      onLoad={setParsedResponse}
      resultsContent={resultsContent}
    />
  );
}
