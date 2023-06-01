import { useState } from 'react';

import { BasePage } from '../../../components/BasePage';
import Details from '../../../components/Details/Details';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import type EbirdRegionInfo from '../../../types/EbirdRegionInfo';
import type EbirdRegionNameFormat from '../../../types/EbirdRegionNameFormat';
import { Select, type SelectOptionArray } from '../../../components/Select';
import {
  Table,
  type TableCellArray,
  type TableHeader,
} from '../../../components/Table';
import { TextInput } from '../../../components/TextInput';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function RegionInfo() {
  const { getRegionInfo } = useEbirdApi();

  const [delimiter, setDelimiter] = useState(', ');
  const [regionCode, setRegionCode] = useState('');
  const [regionInfo, setRegionInfo] = useState<EbirdRegionInfo>();
  const [regionNameFormat, setRegionNameFormat] =
    useState<EbirdRegionNameFormat>('full');

  const tableCells: TableCellArray<EbirdRegionInfo> = [
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
  ];

  const tableHeaders: TableHeader[] = [
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
  ];

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
        options={regionNameFormatOptions}
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
        <Table
          cells={tableCells}
          headers={tableHeaders}
          items={[regionInfo]}
        />
      </Details>
    );

  return (
    <BasePage<EbirdRegionInfo>
      formContent={formContent}
      onLoad={setRegionInfo}
      onSubmit={onSubmit}
      requiresApiKey
      resultsContent={resultsContent}
      title="Region Info"
    />
  );
}
