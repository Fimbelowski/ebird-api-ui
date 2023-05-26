import type EbirdLocation from './EbirdLocation';

interface EbirdHotspot
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

export default EbirdHotspot;
