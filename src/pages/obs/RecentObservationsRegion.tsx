import { useState } from 'react';

import { BasePageTable, type Tables } from '../../components/BasePageTable';
import BackInput from '../../components/BackInput';
import CheckboxInput from '../../components/CheckboxInput';
import type EbirdObservation from '../../types/EbirdObservation';
import type EbirdTaxonomyCategory from '../../types/EbirdTaxonomyCategory';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import EbirdTaxonomyCategorySelect from '../../components/EbirdTaxonomyCategorySelect';
import GoogleMapsLink from '../../components/GoogleMapsLink';
import LocaleSelect from '../../components/LocaleSelect';
import LocationTextarea from '../../components/LocationTextarea';
import { NumberInput } from '../../components/NumberInput';
import useEbirdApi from '../../hooks/useEbirdApi';

export default function RecentObservationsRegion() {
  const { getRecentObservationsInARegion } = useEbirdApi();

  const [back, setBack] = useState(14);
  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [includeProvisionalObs, setIncludeProvisionalObs] = useState(false);
  const [locale, setLocale] = useState('en');
  const [locations, setLocations] = useState<string[]>([]);
  const [maxResults, setMaxResults] = useState<number>();
  const [onlyObsFromHotspots, setOnlyObsFromHotspots] = useState(false);
  const [regionCode, setRegionCode] = useState('');

  const tables: Tables<EbirdObservation> = [
    {
      cells: [
        {
          callback: ({ comName }) => comName,
        },
        {
          callback: ({ exoticCategory }) => exoticCategory,
        },
        {
          align: 'right',
          callback: ({ howMany }) => howMany?.toString(),
        },
        {
          align: 'right',
          callback: ({ lat }) => lat.toString(),
        },
        {
          align: 'right',
          callback: ({ lng }) => lng.toString(),
        },
        {
          callback: ({ locId }) => locId,
        },
        {
          callback: ({ locName }) => locName,
        },
        {
          callback: ({ locationPrivate }) => locationPrivate,
        },
        {
          callback: ({ obsDt }) => obsDt,
        },
        {
          callback: ({ obsReviewed }) => obsReviewed,
        },
        {
          callback: ({ obsValid }) => obsValid,
        },
        {
          callback: ({ sciName }) => sciName,
        },
        {
          callback: ({ speciesCode }) => speciesCode,
        },
        {
          callback: ({ subId }) => subId,
        },
      ],
      headers: [
        {
          label: 'comName',
        },
        {
          label: 'exoticCategory',
        },
        {
          align: 'right',
          label: 'howMany',
        },
        {
          align: 'right',
          label: 'lat',
        },
        {
          align: 'right',
          label: 'lng',
        },
        {
          label: 'locId',
        },
        {
          label: 'locName',
        },
        {
          label: 'locationPrivate',
        },
        {
          label: 'obsDt',
        },
        {
          label: 'obsReviewed',
        },
        {
          label: 'obsValid',
        },
        {
          label: 'sciName',
        },
        {
          label: 'speciesCode',
        },
        {
          label: 'subId',
        },
      ],
      title: 'Detailed Table',
    },
    {
      cells: [
        {
          callback: ({ comName }) => comName,
        },
        {
          callback: ({ howMany }) => howMany?.toLocaleString(),
        },
        {
          callback: ({ lat, lng, locName }) => (
            <GoogleMapsLink
              latitude={lat}
              longitude={lng}
            >
              {locName}
            </GoogleMapsLink>
          ),
        },
        {
          callback: ({ obsDt }) => new Date(obsDt).toLocaleString(),
        },
      ],
      headers: [
        {
          label: 'Species',
        },
        {
          label: 'Quantity',
        },
        {
          label: 'Location',
        },
        {
          label: 'Date',
        },
      ],
      open: true,
      title: 'Simple Table',
    },
  ];

  async function request() {
    return await getRecentObservationsInARegion(
      regionCode,
      back,
      category,
      onlyObsFromHotspots,
      includeProvisionalObs,
      maxResults,
      locations
    );
  }

  const formContent = (
    <>
      <EbirdRegionCodeInput
        onChange={setRegionCode}
        required
        value={regionCode}
      />
      <BackInput
        onChange={setBack}
        value={back}
      />
      <EbirdTaxonomyCategorySelect
        onChange={setCategory}
        value={category}
      />
      <CheckboxInput
        id="hotspot"
        label="Only Fetch Observations From Hotspots"
        onChange={setOnlyObsFromHotspots}
        value={onlyObsFromHotspots}
      />
      <CheckboxInput
        id="include-provisional"
        label="Include Provisional Observations"
        onChange={setIncludeProvisionalObs}
        value={includeProvisionalObs}
      />
      <NumberInput
        id="max-results"
        label="Max Results"
        max={10000}
        min={1}
        onChange={setMaxResults}
        placeholder="100"
        value={maxResults}
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
    <BasePageTable<EbirdObservation>
      formContent={formContent}
      requiresApiKey
      request={request}
      tables={tables}
      title="Recent Observations in a Region"
    />
  );
}
