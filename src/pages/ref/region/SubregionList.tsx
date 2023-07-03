import { useState } from 'react';

import {
  BasePageTableEbirdRegion,
  type EbirdRegion,
} from '../../../components/BasePageTableEbirdRegion';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import FormatSelect from '../../../components/FormatSelect';
import {
  Select,
  type SelectOptionArray,
} from '../../../components/Select/Select';
import { useSubregionList } from '../../../services/ebird/hooks/endpoints/ref/region/useSubregionList';
import csvToArray from '../../../utilities/csvToArray';
import type EbirdRegionType from '../../../types/EbirdRegionType';

export default function SubregionList() {
  const getSubregionList = useSubregionList();

  const [format, setFormat] = useState<EbirdRecordFormat>('csv');
  const [parentRegionCode, setParentRegionCode] = useState('');
  const [regionType, setRegionType] = useState<EbirdRegionType>('country');

  const regionTypeOptions: SelectOptionArray<EbirdRegionType> = [
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

  async function onSubmit() {
    return await getSubregionList(regionType, parentRegionCode, format);
  }

  function csvParser(csv: string) {
    return csvToArray<EbirdRegion>(csv, ['code', 'name'], {}, true);
  }

  const formContent = (
    <>
      <EbirdRegionCodeInput
        allowCountry
        allowSubnational1
        allowWorld
        labelBase="Parent Region Code"
        onChange={setParentRegionCode}
        value={parentRegionCode}
      />
      <Select<EbirdRegionType>
        id="region-type"
        label="Sub-Region Type"
        onChange={setRegionType}
        options={regionTypeOptions}
        required
        value={regionType}
      />
      <FormatSelect
        onChange={setFormat}
        value={format}
      />
    </>
  );

  return (
    <BasePageTableEbirdRegion
      description="Fetches the list of sub-regions within a specified country or region."
      formContent={formContent}
      onSubmit={onSubmit}
      parser={format === 'csv' ? csvParser : undefined}
      requiresApiKey
      title="Sub-region List"
    />
  );
}
