import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import type EbirdRegion from '../../../types/EbirdRegion';
import EbirdRegionTable from '../../../components/EbirdRegionTable';
import type EbirdRegionType from '../../../types/EbirdRegionType';
import parseRequestData from '../../../utilities/parseRequestData';
import Select from '../../../components/Select';
import type SelectOption from '../../../types/SelectOption';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useEbirdFormat from '../../../hooks/useEbirdFormat';
import useRequestState from '../../../hooks/useRequestState';

export default function SubregionList() {
  const { getSubregionList } = useEbirdApi();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();
  const { format, FormatSelect, setFormat } = useEbirdFormat();

  const [parentRegionCode, setParentRegionCode] = useState('');
  const [regionType, setRegionType] = useState<EbirdRegionType>('country');
  const [subregions, setSubregions] = useState<EbirdRegion[]>([]);

  const regionTypeOptions: Array<SelectOption<EbirdRegionType>> = [
    {
      label: 'Country',
      value: 'country',
    },
    {
      label: 'Subnational 1',
      value: 'subnational1',
    },
    {
      label: 'Subnational 2',
      value: 'subnational2',
    },
  ];

  function onSubmit() {
    setLoading(true);

    getSubregionList(regionType, parentRegionCode, format)
      .then(async (response) => await response.text())
      .then((data) => {
        const parsedData = parseRequestData(data, ['code', 'name'], true);
        setRawResponse(data);
        setSubregions(parsedData);
        setHasQueried(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const formContent = (
    <>
      <Select<EbirdRegionType>
        id="region-type"
        label="Region Type"
        options={regionTypeOptions}
        onChange={setRegionType}
        value={regionType}
      />
      <EbirdRegionCodeInput
        label="Parent Region Code"
        onChange={setParentRegionCode}
        required
        value={parentRegionCode}
      />
      <FormatSelect
        id="format"
        onChange={setFormat}
        value={format}
      />
    </>
  );

  const resultsContent = (
    <Details
      open
      summary="Results Table"
    >
      <EbirdRegionTable regions={subregions} />
    </Details>
  );

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={onSubmit}
      rawResponse={rawResponse}
      requiresApiKey
      resultsContent={resultsContent}
      title="Sub-region List"
    />
  );
}
