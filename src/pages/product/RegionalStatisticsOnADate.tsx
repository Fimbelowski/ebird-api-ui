import { useState } from 'react';

import { BasePageKeyValuePairsList } from '../../components/BasePageKeyValuePairsList';
import DateInput from '../../components/DateInput';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import useRegionalStatisticsOnADate from '../../services/ebird/hooks/endpoints/product/useRegionalStatisticsOnADate';
import dateStringToYearMonthDay from '../../utilities/dateStringToYearMonthDay';
import PAGE from './PAGE';

interface EbirdRegionStats {
  numChecklists: number;
  numContributors: number;
  numSpecies: number;
}

export default function RegionalStatisticsOnADate() {
  const getRegionalStatisticsOnADate = useRegionalStatisticsOnADate();

  const [date, setDate] = useState('');
  const [regionCode, setRegionCode] = useState('');

  async function onSubmit() {
    if (date === undefined) {
      throw Error('A valid date is required.');
    }

    return await getRegionalStatisticsOnADate(
      regionCode,
      ...dateStringToYearMonthDay(date)
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

  return (
    <BasePageKeyValuePairsList<EbirdRegionStats>
      formContent={formContent}
      onSubmit={onSubmit}
      page={PAGE.RegionalStatisticsOnADate}
    />
  );
}
