import { useState } from 'react';

import { BasePage, type BasePageProps } from './BasePage';
import Details from './Details';

type Props = Omit<BasePageProps<string[]>, 'onLoad' | 'resultsContent'>;

export default function BasePageList(props: Props) {
  const [parsedResponse, setParsedResponse] = useState<string[]>([]);

  function ResultsList() {
    const listItems = parsedResponse.map((item) => <li key={item}>{item}</li>);

    return <ul className="base-page-list__list">{listItems}</ul>;
  }

  const resultsContent = (
    <Details
      open
      summary="Results"
    >
      <ResultsList />
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
