import { useState } from 'react';

import { BasePageKeyValuePairsList } from '../../components/BasePageKeyValuePairsList';
import DateInput from '../../components/DateInput';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import useRegionalStatisticsOnADate from '../../services/ebird/hooks/endpoints/product/useRegionalStatisticsOnADate';
import dateStringToYearMonthDay from '../../utilities/dateStringToYearMonthDay';

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
      description="Fetches a summary of the number of checklists submitted, species seen and contributors on a given date for a country or region."
      formContent={formContent}
      onSubmit={onSubmit}
      requiresApiKey
      title="Regional Statistics on a Date"
    />
  );
}
