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
import {
  useSubregionList,
  type EbirdRegionType,
} from '../../../services/ebird/hooks/endpoints/ref/region/useSubregionList';
import csvToArray from '../../../utilities/csvToArray';

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
    return csvToArray<EbirdRegion>(csv, ['code', 'name'], true);
  }

  const formContent = (
    <>
      <Select<EbirdRegionType>
        id="region-type"
        label="Region Type"
        onChange={setRegionType}
        options={regionTypeOptions}
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

  return (
    <BasePageTableEbirdRegion
      formContent={formContent}
      onSubmit={onSubmit}
      parser={format === 'csv' ? csvParser : undefined}
      requiresApiKey
      title="Sub-region List"
    />
  );
}
