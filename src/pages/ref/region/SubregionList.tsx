import { useState } from 'react';

import BasePage from '../../../components/BasePage';

export default function SubregionList() {
  const [hasQueried, setHasQueries] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState('');

  return (
    <BasePage
      hasQueried={hasQueried}
      loading={loading}
      rawResponse={rawResponse}
      title="Sub-region List"
    />
  );
}
