import type EbirdLocation from './EbirdLocation';

export default interface EbirdHotspot
  extends Pick<
    EbirdLocation,
    | 'countryCode'
    | 'lat'
    | 'lng'
    | 'locId'
    | 'locName'
    | 'subnational1Code'
    | 'subnational2Code'
  > {
  latestObsDt?: string;
  numSpeciesAllTime?: number;
}
