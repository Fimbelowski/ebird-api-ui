import csvToArray from '../../../utilities/csvToArray';
import type EbirdHotspot from '../../../types/EbirdHotspot';

export default function ebirdHotspotCsvParser(
  csv: string,
  ignoreFirstLine = false
) {
  return csvToArray<EbirdHotspot>(
    csv,
    [
      'locId',
      'countryCode',
      'subnational1Code',
      'subnational2Code',
      'lat',
      'lng',
      'locName',
      'latestObsDt',
      'numSpeciesAllTime',
    ],
    {
      lat: (stringValue: string) => parseFloat(stringValue),
      lng: (stringValue: string) => parseFloat(stringValue),
      numSpeciesAllTime: (stringValue = '0') => parseInt(stringValue, 10),
    },
    ignoreFirstLine
  );
}
