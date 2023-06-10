import csvToArray from '../../../utilities/csvToArray';

export default function ebirdHotspotCsvParser(
  csv: string,
  ignoreFirstLine = false
) {
  return csvToArray(
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
    ignoreFirstLine
  );
}
