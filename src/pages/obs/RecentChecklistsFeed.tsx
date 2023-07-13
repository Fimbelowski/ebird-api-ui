import { useState } from 'react';

import BasePageTableEbirdChecklist from '../../components/BasePageTableEbirdChecklist';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import useRecentChecklistsFeed from '../../services/ebird/hooks/endpoints/data/obs/useRecentChecklistsFeed';
import MaxResultsInput from '../../components/MaxResultsInput';
import PAGE from './PAGE';

export default function RecentChecklistsFeed() {
  const getRecentChecklists = useRecentChecklistsFeed();

  const [maxResults, setMaxResults] = useState('');
  const [regionCode, setRegionCode] = useState('');

  async function onSubmit() {
    return await getRecentChecklists(regionCode, maxResults);
  }

  const formContent = (
    <>
      <EbirdRegionCodeInput
        allowCountry
        allowLocation
        allowSubnational1
        allowSubnational2
        onChange={setRegionCode}
        value={regionCode}
      />
    </>
  );

  const formOptionsFieldsetContent = (
    <MaxResultsInput
      max="200"
      onChange={setMaxResults}
      placeholder="10"
      value={maxResults}
    />
  );

  return (
    <BasePageTableEbirdChecklist
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onSubmit={onSubmit}
      page={PAGE.RecentChecklists}
    />
  );
}
