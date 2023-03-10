export default interface EbirdObservation {
  hideFlags: any[]; // Make new type
  howManyAtLeast: number;
  howManyAtMost: number;
  howManyStr: string;
  obsDt: string;
  obsId: string;
  present: boolean;
  projId: string;
  speciesCode: string;
  subId: string;
  subnational1Code: string;
}
