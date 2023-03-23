import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import type EbirdRegionInfo from '../../../types/EbirdRegionInfo';
import type EbirdRegionNameFormat from '../../../types/EbirdRegionNameFormat';
import Select from '../../../components/Select';
import type SelectOption from '../../../types/SelectOption';
import TextInput from '../../../components/TextInput';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useTable from '../../../hooks/useTable';

export default function RegionInfo() {
  const { getRegionInfo } = useEbirdApi();
  const { Table } = useTable<EbirdRegionInfo>(
    [
      {
        callback: ({ result }) => result,
      },
      {
        callback: ({ bounds: { minX } }) => minX.toString(),
      },
      {
        callback: ({ bounds: { maxX } }) => maxX.toString(),
      },
      {
        callback: ({ bounds: { minY } }) => minY.toString(),
      },
      {
        callback: ({ bounds: { maxY } }) => maxY.toString(),
      },
    ],
    [
      {
        label: 'Region Name',
      },
      {
        label: 'Min X',
      },
      {
        label: 'Max X',
      },
      {
        label: 'Min Y',
      },
      {
        label: 'Max Y',
      },
    ]
  );

  const [delimiter, setDelimiter] = useState(', ');
  const [regionCode, setRegionCode] = useState('');
  const [regionInfo, setRegionInfo] = useState<EbirdRegionInfo>();
  const [regionNameFormat, setRegionNameFormat] =
    useState<EbirdRegionNameFormat>('full');

  const regionNameFormatSelectOptions: Array<
    SelectOption<EbirdRegionNameFormat>
  > = [
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

  async function request() {
    return await getRegionInfo(regionCode, regionNameFormat, delimiter);
  }

  const formContent = (
    <>
      <EbirdRegionCodeInput
        onChange={setRegionCode}
        required
        value={regionCode}
      />
      <Select<EbirdRegionNameFormat>
        id="region-name-format"
        label="Region Name Format"
        onChange={setRegionNameFormat}
        options={regionNameFormatSelectOptions}
        value={regionNameFormat}
      />
      <TextInput
        id="delimiter"
        label="Delimiter"
        maxLength={2}
        placeholder="Any Characters"
        onChange={setDelimiter}
        value={delimiter}
      />
    </>
  );

  const resultsContent =
    regionInfo === undefined ? null : (
      <Details
        open
        summary="Results Table"
      >
        <Table items={[regionInfo]} />
      </Details>
    );

  return (
    <BasePage<EbirdRegionInfo>
      formContent={formContent}
      onLoad={setRegionInfo}
      request={request}
      requiresApiKey
      resultsContent={resultsContent}
      title="Region Info"
    />
  );
}
