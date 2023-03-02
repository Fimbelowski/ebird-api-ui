import parseRequestData from './parseRequestData';

export default function parseEbirdHotspotRequestData(data: string) {
  return parseRequestData(data, [
    'locId',
    'countryCode',
    'subnational1Code',
    'subnational2Code',
    'lat',
    'lng',
    'locName',
    'latestObsDt',
    'numSpeciesAllTime',
  ]);
}
