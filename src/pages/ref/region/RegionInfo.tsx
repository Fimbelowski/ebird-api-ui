import { useState } from 'react';

import {
  BasePageKeyValuePairsList,
  type SimpleRecord,
} from '../../../components/BasePageKeyValuePairsList';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import {
  Select,
  type SelectOptionArray,
} from '../../../components/Select/Select';
import { TextInput } from '../../../components/TextInput';
import { useRegionInfo } from '../../../services/ebird/hooks/endpoints/ref/region/useRegionInfo';
import type EbirdRegionNameFormat from '../../../types/EbirdRegionNameFormat';
import PAGE from './PAGE';

interface EbirdRegionInfo {
  bounds: {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
  };
  result: string;
}

export default function RegionInfo() {
  const getRegionInfo = useRegionInfo();

  const [delimiter, setDelimiter] = useState('');
  const [regionCode, setRegionCode] = useState('');
  const [regionNameFormat, setRegionNameFormat] =
    useState<EbirdRegionNameFormat>('full');

  const regionNameFormatOptions: SelectOptionArray<EbirdRegionNameFormat> = [
    {
      label: 'Detailed',
      value: 'detailed',
    },
    {
      label: 'Full',
      value: 'full',
    },
    {
      label: 'Name Only',
      value: 'nameonly',
    },
    {
      label: 'Qualified Detailed',
      value: 'detailednoqual',
    },
    {
      label: 'Qualified Name',
      value: 'namequal',
    },
    {
      label: 'Reverse Detailed',
      value: 'revdetailed',
    },
  ];

  async function onSubmit() {
    return await getRegionInfo(regionCode, regionNameFormat, delimiter);
  }

  function transformer(regionInfo: EbirdRegionInfo): SimpleRecord {
    const { bounds, result } = regionInfo;

    return {
      ...bounds,
      result,
    };
  }

  const formContent = (
    <>
      <EbirdRegionCodeInput
        allowCountry
        allowLocation
        allowMajorRegion
        allowSubnational1
        allowSubnational2
        onChange={setRegionCode}
        value={regionCode}
      />
    </>
  );

  const formOptionsFieldsetContent = (
    <>
      <Select<EbirdRegionNameFormat>
        id="region-name-format"
        label="Region Name Format"
        onChange={setRegionNameFormat}
        options={regionNameFormatOptions}
        value={regionNameFormat}
      />
      <TextInput
        id="delimiter"
        label="Delimiter"
        maxLength={2}
        placeholder=", "
        onChange={setDelimiter}
        value={delimiter}
      />
    </>
  );

  return (
    <BasePageKeyValuePairsList<EbirdRegionInfo>
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onSubmit={onSubmit}
      page={PAGE.RegionInfo}
      transformer={transformer}
    />
  );
}
