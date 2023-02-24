export default interface EbirdHotspot {
  countryCode: string;
  lat: number;
  latestObsDt?: string;
  lng: number;
  locId: string;
  locName: string;
  numSpeciesAllTime?: number;
  subnational1Code: string;
  subnational2Code: string;
}
