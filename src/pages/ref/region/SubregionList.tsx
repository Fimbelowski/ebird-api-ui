import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import type EbirdRegion from '../../../types/EbirdRegion';
import EbirdRegionTable from '../../../components/EbirdRegionTable';
import type EbirdRegionType from '../../../types/EbirdRegionType';
import Select from '../../../components/Select';
import type SelectOption from '../../../types/SelectOption';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useEbirdFormat from '../../../hooks/useEbirdFormat';

export default function SubregionList() {
  const { getSubregionList } = useEbirdApi();
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

  async function request() {
    return await getSubregionList(regionType, parentRegionCode, format);
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
    <BasePage<EbirdRegion[]>
      formContent={formContent}
      onLoad={setSubregions}
      request={request}
      requiresApiKey
      resultsContent={resultsContent}
      title="Sub-region List"
    />
  );
}
