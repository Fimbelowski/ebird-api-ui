import type EbirdChecklistAux from './EbirdChecklistAux';
import type EbirdChecklistAuxAi from './EbirdChecklistAuxAi';
import type EbirdObservation from './EbirdObservation';

export default interface EbirdChecklistDetailed {
  allObsReported: boolean;
  checklistId: string;
  creationDt: string;
  durationHrs: number;
  effortDistanceEnteredUnit: 'mi' | 'km';
  effortDistanceKm: number;
  lastEditedDt: string;
  locId: string;
  numObservers: number;
  obs: EbirdObservation[];
  obsDt: string;
  obsTimeValid: boolean;
  projId: string;
  protocolId: string;
  subAux: EbirdChecklistAux[];
  subAuxAi: EbirdChecklistAuxAi[];
  subId: string;
  submissionMethodCode: string;
  submissionMethodVersion: string;
  submissionMethodVersionDisp: string;
  subnational1Code: string;
  userDisplayName: string;
}
