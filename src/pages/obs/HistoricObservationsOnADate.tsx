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
import IncludeProvisionalObservationsInput from '../../components/IncludeProvisionalObservationsInput';
import MaxResultsInput from '../../components/MaxResultsInput';
import SpeciesCommonNameLocaleSelect from '../../components/SpeciesCommonNameLocaleSelect';
import { Select, type SelectOptionArray } from '../../components/Select/Select';
import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import type EbirdHistoricalObservationRank from '../../types/EbirdHistoricalObservationRank';
import LocationsInput from '../../components/LocationsInput';

export default function HistoricObservationsOnADate() {
  const getHistoricObservationsOnADate = useHistoricObservationsOnADate();

  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [date, setDate] = useState('');
  const [detailLevel, setDetailLevel] =
    useState<EbirdObservationDetailLevel>('simple');
  const [includeProvisionalObservations, setIncludeProvisionalObservations] =
    useState(false);
  const [locale, setLocale] = useState('en');
  const [locations, setLocations] = useState('');
  const [maxResults, setMaxResults] = useState('');
  const [onlyObservationsFromHotspots, setOnlyObservationsFromHotspots] =
    useState(false);
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
      onlyObservationsFromHotspots,
      includeProvisionalObservations,
      maxResults,
      rank,
      locations,
      locale
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
      <LocationsInput
        maxLocations={50}
        onChange={setLocations}
        value={locations}
      />
      <EbirdTaxonomyCategorySelect
        onChange={setCategory}
        value={category}
      />
      <EbirdOnlyObservationsFromHotspotsInput
        onChange={setOnlyObservationsFromHotspots}
        value={onlyObservationsFromHotspots}
      />
      <IncludeProvisionalObservationsInput
        onChange={setIncludeProvisionalObservations}
        value={includeProvisionalObservations}
      />
      <Select<EbirdHistoricalObservationRank>
        id="rank"
        label="Rank By"
        onChange={setRank}
        options={rankSelectOptions}
        value={rank}
      />
      <EbirdObservationDetailLevelSelect
        onChange={setDetailLevel}
        value={detailLevel}
      />
      <MaxResultsInput
        onChange={setMaxResults}
        placeholder="10000"
        value={maxResults}
      />
      <SpeciesCommonNameLocaleSelect
        onChange={setLocale}
        value={locale}
      />
    </>
  );

  return (
    <BasePageTableEbirdObservation
      description="Fetches a list of all taxa seen in a country, region or location on a specific date."
      detailLevel={detailLevel}
      formContent={formContent}
      onSubmit={onSubmit}
      title="Historic Observations On A Date"
    />
  );
}
