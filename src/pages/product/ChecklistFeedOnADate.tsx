import { useState } from 'react';

import BasePageTableEbirdChecklist from '../../components/BasePageTableEbirdChecklist';
import DateInput from '../../components/DateInput';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import { Select, type SelectOptionArray } from '../../components/Select/Select';
import { useChecklistFeedOnADate } from '../../services/ebird/hooks/endpoints/product/useChecklistFeedOnADate';
import dateStringToYearMonthDay from '../../utilities/dateStringToYearMonthDay';
import type EbirdChecklistSortBy from '../../types/EbirdChecklistSortBy';
import MaxResultsInput from '../../components/MaxResultsInput';
import PAGE from './PAGE';

export default function ChecklistFeedOnADate() {
  const getChecklistFeedOnADate = useChecklistFeedOnADate();

  const [date, setDate] = useState('');
  const [maxResults, setMaxResults] = useState('');
  const [regionCode, setRegionCode] = useState('');
  const [sortKey, setSortKey] = useState<EbirdChecklistSortBy>('obs_dt');

  const sortKeyOptions: SelectOptionArray<EbirdChecklistSortBy> = [
    {
      label: 'Observation Date',
      value: 'obs_dt',
    },
    {
      label: 'Creation Date',
      value: 'creation_dt',
    },
  ];

  async function onSubmit() {
    if (date === undefined) {
      throw Error('A valid date is required.');
    }

    return await getChecklistFeedOnADate(
      regionCode,
      ...dateStringToYearMonthDay(date),
      sortKey,
      maxResults
    );
  }

  const formContent = (
    <>
      <DateInput
        id="date"
        onChange={setDate}
        required
      />
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
    <>
      <Select<EbirdChecklistSortBy>
        id="sort-key"
        label="Sort By"
        onChange={setSortKey}
        options={sortKeyOptions}
        value={sortKey}
      />
      <MaxResultsInput
        max="200"
        onChange={setMaxResults}
        placeholder="10"
        value={maxResults}
      />
    </>
  );

  return (
    <BasePageTableEbirdChecklist
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onSubmit={onSubmit}
      page={PAGE.ChecklistFeedOnADate}
    />
  );
}
