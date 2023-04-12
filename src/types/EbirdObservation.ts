export default interface EbirdObservation {
  comName: string;
  exoticCategory?: string;
  howMany?: number;
  lat: number;
  lng: number;
  locId: string;
  locName: string;
  locationPrivate: boolean;
  obsDt: string;
  obsReviewed: boolean;
  obsValid: boolean;
  sciName: string;
  speciesCode: string;
  subId: string;
}
