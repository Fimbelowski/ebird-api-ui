import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import type EbirdRegionInfo from '../../../types/EbirdRegionInfo';
import type EbirdRegionNameFormat from '../../../types/EbirdRegionNameFormat';
import Select from '../../../components/Select';
import type SelectOption from '../../../types/SelectOption';
import Table from '../../../components/Table';
import type TableCell from '../../../types/TableCell';
import type TableHeader from '../../../types/TableHeader';
import TextInput from '../../../components/TextInput';
import useApiKey from '../../../hooks/useApiKey';
import useRequestState from '../../../hooks/useRequestState';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function RegionInfo() {
  const { apiKey } = useApiKey();
  const { getRegionInfo } = useEbirdApi();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

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

  const tableCells: Array<TableCell<EbirdRegionInfo>> = [
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

  function onFormSubmit() {
    setLoading(true);

    getRegionInfo(apiKey, regionCode, regionNameFormat, delimiter)
      .then(async (response) => await response.text())
      .then((data) => {
        setRawResponse(data);
        setRegionInfo(JSON.parse(data));
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
        <Table<EbirdRegionInfo>
          cells={tableCells}
          headers={tableHeaders}
          items={[regionInfo]}
        />
      </Details>
    );

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={onFormSubmit}
      rawResponse={rawResponse}
      requiresApiKey
      resultsContent={resultsContent}
      title="Region Info"
    />
  );
}
