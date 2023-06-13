import { useState } from 'react';

import { BasePage } from '../../components/BasePage/BasePage';
import useViewChecklist from '../../services/ebird/hooks/endpoints/product/useViewChecklist';
import { TextInput } from '../../components/TextInput';
import Details from '../../components/Details/Details';
import KeyValuePairsList from '../../components/KeyValuePairsList/KeyValuePairsList';

interface EbirdChecklist {
  allObsReported: boolean;
  checklistId: string;
  creationDt: string;
  durationHrs: number;
  effortDistanceEnteredUnit: string; // I suspect this is just 'km' | 'mi'
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

export default function ViewChecklist() {
  const getChecklist = useViewChecklist();

  const [checklist, setChecklist] = useState<EbirdChecklist>();
  const [subId, setSubId] = useState('');

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

  function ResultsContent() {
    if (checklist === undefined) {
      return null;
    }

    type PartialEbirdChecklist = Partial<EbirdChecklist>;

    const clonedChecklist: PartialEbirdChecklist = JSON.parse(
      JSON.stringify(checklist)
    );

    delete clonedChecklist.obs;
    delete clonedChecklist.subAux;
    delete clonedChecklist.subAuxAi;

    return (
      <Details summary="Detailed Checklist">
        <KeyValuePairsList<PartialEbirdChecklist> object={clonedChecklist} />
      </Details>
    );
  }

  return (
    <BasePage<EbirdChecklist>
      formContent={formContent}
      onLoad={setChecklist}
      onSubmit={onSubmit}
      requiresApiKey
      resultsContent={ResultsContent()}
      title="View Checklist"
    />
  );
}
