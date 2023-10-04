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
import { Table, type TableCellArray } from '../../components/Table/Table';
import kilometersToMiles from '../../utilities/kilometersToMiles';
import hoursToHoursAndMinutes from '../../utilities/hoursToHoursAndMinutes';
import PAGE from './PAGE';
import type { TableHeaderPropsArray } from '../../components/TableHeader/TableHeader';

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

    const observationsTableHeaders: TableHeaderPropsArray = [
      {
        label: 'hideFlags',
      },
      {
        label: 'howManyAtLeast',
        align: 'right',
      },
      {
        label: 'howManyAtMost',
        align: 'right',
      },
      {
        label: 'howManyStr',
        align: 'right',
      },
      {
        label: 'obsDt',
      },
      {
        label: 'obsId',
      },
      {
        label: 'present',
      },
      {
        label: 'projId',
      },
      {
        label: 'speciesCode',
      },
      {
        label: 'subnational1Code',
      },
      {
        label: 'subId',
      },
    ];

    const observationsTableCells: TableCellArray<EbirdChecklistObservation> = [
      {
        callback: ({ hideFlags }) => hideFlags.join(''),
      },
      {
        align: 'right',
        callback: ({ howManyAtLeast }) => howManyAtLeast,
      },
      {
        align: 'right',
        callback: ({ howManyAtMost }) => howManyAtMost,
      },
      {
        align: 'right',
        callback: ({ howManyStr }) => howManyStr,
      },
      {
        callback: ({ obsDt }) => obsDt,
      },
      {
        callback: ({ obsId }) => obsId,
      },
      {
        callback: ({ present }) => present.toString(),
      },
      {
        callback: ({ projId }) => projId,
      },
      {
        callback: ({ speciesCode }) => speciesCode,
      },
      {
        callback: ({ subnational1Code }) => subnational1Code,
      },
      {
        callback: ({ subId }) => subId,
      },
    ];

    const checklistAuxTableHeaders: TableHeaderPropsArray = [
      {
        label: 'auxCode',
      },
      {
        label: 'entryMethodCode',
      },
      {
        label: 'fieldName',
      },
      {
        label: 'subId',
      },
    ];

    const checklistAuxTableCells: TableCellArray<EbirdChecklistAux> = [
      {
        callback: ({ auxCode }) => auxCode,
      },
      {
        callback: ({ entryMethodCode }) => entryMethodCode,
      },
      {
        callback: ({ fieldName }) => fieldName,
      },
      {
        callback: ({ subId }) => subId,
      },
    ];

    const checklistAuxAiTableHeaders: TableHeaderPropsArray = [
      {
        label: 'aiType',
      },
      {
        align: 'right',
        label: 'eventId',
      },
      {
        label: 'method',
      },
      {
        label: 'source',
      },
      {
        label: 'subId',
      },
    ];

    const checklistAuxAiTableCells: TableCellArray<EbirdChecklistAuxAi> = [
      {
        callback: ({ aiType }) => aiType,
      },
      {
        align: 'right',
        callback: ({ eventId }) => eventId,
      },
      {
        callback: ({ method }) => method,
      },
      {
        callback: ({ source }) => source,
      },
      {
        callback: ({ subId }) => subId,
      },
    ];

    return (
      <>
        <KeyValuePairsList keyValuePairs={Object.entries(clonedChecklist)} />
        {observations.length > 0 ? (
          <>
            <h3>Observations</h3>
            <Table<EbirdChecklistObservation>
              cells={observationsTableCells}
              headers={observationsTableHeaders}
              items={observations}
            />
          </>
        ) : null}
        {subAux.length > 0 ? (
          <>
            <h3>Checklist Aux</h3>
            <Table<EbirdChecklistAux>
              cells={checklistAuxTableCells}
              headers={checklistAuxTableHeaders}
              items={subAux}
            />
          </>
        ) : null}
        {subAuxAi.length > 0 ? (
          <>
            <h3>Checklist Aux AI</h3>
            <Table<EbirdChecklistAuxAi>
              cells={checklistAuxAiTableCells}
              headers={checklistAuxAiTableHeaders}
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

    const tableHeaders: TableHeaderPropsArray = [
      {
        label: 'Species Code',
      },
      {
        align: 'right',
        label: 'Quantity',
      },
    ];

    const tableCells: TableCellArray<EbirdChecklistObservation> = [
      {
        callback: ({ speciesCode }) => speciesCode,
      },
      {
        align: 'right',
        callback: ({ howManyStr, present }) => (present ? 'X' : howManyStr),
      },
    ];

    return (
      <>
        <KeyValuePairsList keyValuePairs={keyValuePairs} />
        <Table<EbirdChecklistObservation>
          cells={tableCells}
          headers={tableHeaders}
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
