import type EbirdLocation from './EbirdLocation';

export default interface EbirdChecklist {
  loc: EbirdLocation;
  locId: string;
  numSpecies: number;
  obsDt: string;
  obsTime: string;
  subID: string;
  subId: string;
  userDisplayName: string;
}
