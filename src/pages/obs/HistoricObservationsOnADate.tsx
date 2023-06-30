import { useState } from 'react';

import { useHistoricObservationsOnADate } from '../../services/ebird/hooks/endpoints/data/obs/useHistoricObservationsOnADate';
import dateStringToYearMonthDay from '../../utilities/dateStringToYearMonthDay';
import type EbirdTaxonomyCategory from '../../types/EbirdTaxonomyCategory';
import type EbirdObservationDetailLevel from '../../types/EbirdObservationDetailLevel';
import EbirdTaxonomyCategorySelect from '../../components/EbirdTaxonomyCategorySelect';
import EbirdObservationDetailLevelSelect from '../../components/EbirdObservationDetailLevelSelect';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import DateInput from '../../components/DateInput';
import EbirdOnlyObservationsFromHotspotsInput from '../../components/EbirdOnlyObservationsFromHotspotsInput';
import EbirdIncludeProvisionalInput from '../../components/EbirdIncludeProvisionalInput';
import MaxResultsInput from '../../components/MaxResultsInput';
import LocationTextarea from '../../components/LocationTextarea';
import LocaleSelect from '../../components/LocaleSelect/LocaleSelect';
import { Select, type SelectOptionArray } from '../../components/Select/Select';
import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import type EbirdHistoricalObservationRank from '../../types/EbirdHistoricalObservationRank';

export default function HistoricObservationsOnADate() {
  const getHistoricObservationsOnADate = useHistoricObservationsOnADate();

  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [date, setDate] = useState('');
  const [detailLevel, setDetailLevel] =
    useState<EbirdObservationDetailLevel>('simple');
  const [hotspot, setHotspot] = useState(false);
  const [includeProvisional, setIncludeProvisional] = useState(false);
  const [locale, setLocale] = useState('en');
  const [locations, setLocations] = useState<string[]>([]);
  const [maxResults, setMaxResults] = useState('');
  const [rank, setRank] = useState<EbirdHistoricalObservationRank>('mrec');
  const [regionCode, setRegionCode] = useState('');

  const rankSelectOptions: SelectOptionArray<EbirdHistoricalObservationRank> = [
    {
      label: 'First Added',
      value: 'create',
    },
    {
      label: 'Latest Observation of the Day',
      value: 'mrec',
    },
  ];

  async function onSubmit() {
    return await getHistoricObservationsOnADate(
      regionCode,
      ...dateStringToYearMonthDay(date),
      category,
      detailLevel,
      hotspot,
      includeProvisional,
      maxResults,
      rank,
      locations,
      locale
    );
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
      <DateInput
        id="date"
        onChange={setDate}
        required
      />
      <EbirdTaxonomyCategorySelect
        onChange={setCategory}
        value={category}
      />
      <EbirdObservationDetailLevelSelect
        onChange={setDetailLevel}
        value={detailLevel}
      />
      <EbirdOnlyObservationsFromHotspotsInput
        onChange={setHotspot}
        value={hotspot}
      />
      <EbirdIncludeProvisionalInput
        onChange={setIncludeProvisional}
        value={includeProvisional}
      />
      <MaxResultsInput
        onChange={setMaxResults}
        placeholder="10000"
        value={maxResults}
      />
      <Select<EbirdHistoricalObservationRank>
        id="rank"
        label="Rank By"
        onChange={setRank}
        options={rankSelectOptions}
        value={rank}
      />
      <LocationTextarea
        onChange={setLocations}
        value={locations}
      />
      <LocaleSelect
        onChange={setLocale}
        value={locale}
      />
    </>
  );

  return (
    <BasePageTableEbirdObservation
      formContent={formContent}
      onSubmit={onSubmit}
      title="Historic Observations On A Date"
    />
  );
}
