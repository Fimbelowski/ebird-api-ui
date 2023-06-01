import { useState } from 'react';

import BasePageTableEbirdRegion from '../../../components/BasePageTableEbirdRegion';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import type EbirdRegionType from '../../../types/EbirdRegionType';
import {
  Select,
  type SelectOptionArray,
} from '../../../components/Select/Select';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useEbirdFormat from '../../../hooks/useEbirdFormat';

export default function SubregionList() {
  const { getSubregionList } = useEbirdApi();
  const { format, FormatSelect, setFormat } = useEbirdFormat();

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
      requiresApiKey
      title="Sub-region List"
    />
  );
}
