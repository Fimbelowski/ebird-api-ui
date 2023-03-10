import type EbirdLocation from './EbirdLocation';

export default interface EbirdChecklistSimple {
  loc: EbirdLocation;
  locId: string;
  numSpecies: number;
  obsDt: string;
  obsTime?: string;
  subID: string;
  subId: string;
  userDisplayName: string;
}
