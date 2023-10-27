import { useState } from 'react';

import {
  BasePage,
  type ResultsSection,
} from '../../components/BasePage/BasePage';
import useViewChecklist from '../../services/ebird/hooks/endpoints/product/useViewChecklist';
import { TextInput } from '../../components/TextInput';
import {
  KeyValuePairsList,
  type KeyValueTuple,
} from '../../components/KeyValuePairsList/KeyValuePairsList';
import {
  SortDirection,
  Table,
  type TableColumnArray,
} from '../../components/Table/Table';
import kilometersToMiles from '../../utilities/kilometersToMiles';
import hoursToHoursAndMinutes from '../../utilities/hoursToHoursAndMinutes';
import PAGE from './PAGE';
import radixSortBy from '../../utilities/radixSortBy';

interface EbirdChecklist {
  allObsReported: boolean;
  checklistId: string;
  creationDt: string;
  durationHrs: number;
  effortDistanceEnteredUnit: 'km' | 'mi';
  effortDistanceKm: number;
  lastEditedDt: string;
  numObservers: number;
  obs: EbirdChecklistObservation[];
  obsDt: string;
  obsTimeValid: boolean;
  projId: string;
  protocolId: string;
  subAux: EbirdChecklistAux[];
  subAuxAi: EbirdChecklistAuxAi[];
  subId: string;
  subnational1Code: string;
  submissionMethodCode: string;
  submissionMethodVersion: string;
  submissionMethodVersionDisp: string;
  userDisplayName: string;
}

interface EbirdChecklistAux {
  auxCode: string;
  entryMethodCode: string;
  fieldName: string;
  subId: string;
}

interface EbirdChecklistAuxAi {
  aiType: string; // Maybe could be union type?
  eventId: number;
  method: string; // Maybe could be union type?
  source: string;
  subId: string;
}

interface EbirdChecklistObservation {
  hideFlags: unknown[];
  howManyAtLeast: number;
  howManyAtMost: number;
  howManyStr: string;
  obsDt: string;
  obsId: string;
  present: boolean;
  projId: string;
  speciesCode: string;
  subnational1Code: string;
  subId: string;
}

type EbirdChecklistWithoutArrays = Omit<
  EbirdChecklist,
  'obs' | 'subAux' | 'subAuxAi'
>;

export default function ViewChecklist() {
  const getChecklist = useViewChecklist();

  const [checklist, setChecklist] = useState<EbirdChecklist>();
  const [subId, setSubId] = useState('');

  const resultsSections: ResultsSection[] = [
    {
      content: DetailedChecklist(),
      title: 'Detailed Checklist',
    },
    {
      content: SimplifiedChecklist(),
      title: 'Simplified Checklist',
    },
  ];

  async function onSubmit() {
    return await getChecklist(subId);
  }

  const formContent = (
    <TextInput
      id="sub-id"
      label="Checklist ID"
      onChange={setSubId}
      placeholder="S141132046"
      required
      value={subId}
    />
  );

  function getClonedChecklist(): EbirdChecklist {
    return JSON.parse(JSON.stringify(checklist));
  }

  function DetailedChecklist() {
    if (checklist === undefined) {
      return null;
    }

    const {
      obs: observations = [],
      subAux = [],
      subAuxAi = [],
      ...rest
    } = getClonedChecklist();

    const clonedChecklist: EbirdChecklistWithoutArrays = { ...rest };

    const obervationTableColumns: TableColumnArray<EbirdChecklistObservation> =
      [
        {
          callback: ({ hideFlags }) => hideFlags.join(''),
          label: 'hideFlags',
        },
        {
          align: 'right',
          callback: ({ howManyAtLeast }) => howManyAtLeast,
          label: 'howManyAtLeast',
        },
        {
          align: 'right',
          callback: ({ howManyAtMost }) => howManyAtMost,
          label: 'howManyAtMost',
        },
        {
          callback: ({ howManyStr }) => howManyStr,
          align: 'right',
          label: 'howManyStr',
        },
        {
          callback: ({ obsDt }) => obsDt,
          label: 'obsDt',
        },
        {
          callback: ({ obsId }) => obsId,
          label: 'obsId',
        },
        {
          callback: ({ present }) => present.toString(),
          label: 'present',
        },
        {
          callback: ({ projId }) => projId,
          label: 'projId',
        },
        {
          callback: ({ speciesCode }) => speciesCode,
          label: 'speciesCode',
        },
        {
          callback: ({ subnational1Code }) => subnational1Code,
          label: 'subnational1Code',
        },
        {
          callback: ({ subId }) => subId,
          label: 'subId',
        },
      ];

    const checklistAuxTableColumns: TableColumnArray<EbirdChecklistAux> = [
      {
        callback: ({ auxCode }) => auxCode,
        label: 'auxCode',
      },
      {
        callback: ({ entryMethodCode }) => entryMethodCode,
        label: 'entryMethodCode',
      },
      {
        callback: ({ fieldName }) => fieldName,
        label: 'fieldName',
      },
      {
        callback: ({ subId }) => subId,
        label: 'subId',
      },
    ];

    const checklistAuxAiTableColumns: TableColumnArray<EbirdChecklistAuxAi> = [
      {
        callback: ({ aiType }) => aiType,
        label: 'aiType',
      },
      {
        align: 'right',
        callback: ({ eventId }) => eventId,
        label: 'eventId',
      },
      {
        callback: ({ method }) => method,
        label: 'method',
      },
      {
        callback: ({ source }) => source,
        label: 'source',
      },
      {
        callback: ({ subId }) => subId,
        label: 'subId',
      },
    ];

    return (
      <>
        <KeyValuePairsList keyValuePairs={Object.entries(clonedChecklist)} />
        {observations.length > 0 ? (
          <>
            <h3>Observations</h3>
            <Table<EbirdChecklistObservation>
              columns={obervationTableColumns}
              items={observations}
            />
          </>
        ) : null}
        {subAux.length > 0 ? (
          <>
            <h3>Checklist Aux</h3>
            <Table<EbirdChecklistAux>
              columns={checklistAuxTableColumns}
              items={subAux}
            />
          </>
        ) : null}
        {subAuxAi.length > 0 ? (
          <>
            <h3>Checklist Aux AI</h3>
            <Table<EbirdChecklistAuxAi>
              columns={checklistAuxAiTableColumns}
              items={subAuxAi}
            />
          </>
        ) : null}
      </>
    );
  }

  function SimplifiedChecklist() {
    if (checklist === undefined) {
      return null;
    }

    const {
      allObsReported,
      durationHrs,
      effortDistanceEnteredUnit: distanceUnit,
      effortDistanceKm: distance,
      numObservers,
      obs,
      obsDt,
      userDisplayName,
    } = checklist;

    const keyValuePairs: KeyValueTuple[] = [
      ['Submitted By', userDisplayName],
      ['Complete', allObsReported],
      ['Observed On', new Date(obsDt).toLocaleString()],
      ['Duration', hoursToHoursAndMinutes(durationHrs)],
      [
        'Distance',
        `${
          distanceUnit === 'km'
            ? distance
            : kilometersToMiles(distance).toFixed(2)
        }${distanceUnit}`,
      ],
      ['# of Observers', numObservers],
    ];

    const tableColumns: TableColumnArray<EbirdChecklistObservation> = [
      {
        callback: ({ speciesCode }) => speciesCode,
        label: 'Species Code',
      },
      {
        align: 'right',
        callback: ({ howManyStr, present }) => (present ? 'X' : howManyStr),
        label: 'Quantity',
        sortConfig: {
          id: 'quantitySort',
          initialSortDirection: SortDirection.Descending,
          sort: (items: EbirdChecklistObservation[]) =>
            radixSortBy(
              items,
              ({ present, howManyStr }: EbirdChecklistObservation) =>
                present ? 0 : parseInt(howManyStr, 10)
            ).reverse(),
        },
      },
    ];

    return (
      <>
        <KeyValuePairsList keyValuePairs={keyValuePairs} />
        <Table<EbirdChecklistObservation>
          columns={tableColumns}
          items={obs}
        />
      </>
    );
  }

  return (
    <BasePage<EbirdChecklist>
      formContent={formContent}
      onLoad={setChecklist}
      onSubmit={onSubmit}
      page={PAGE.ViewChecklist}
      resultsSections={resultsSections}
    />
  );
}
