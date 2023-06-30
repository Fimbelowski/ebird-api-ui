import useEbirdApi from '../../../useEbirdApi';
import yearMonthDayToUrlParams from '../../../../helpers/yearMonthDayToUrlParams';
import type EbirdObservationDetailLevel from '../../../../../../types/EbirdObservationDetailLevel';
import type EbirdTaxonomyCategory from '../../../../../../types/EbirdTaxonomyCategory';
import type UrlParam from '../../../../types/UrlParam';
import type QueryParam from '../../../../types/QueryParam';
import type EbirdHistoricalObservationRank from '../../../../../../types/EbirdHistoricalObservationRank';

export function useHistoricObservationsOnADate() {
  const curriedMakeRequest = useEbirdApi();

  return async function getHistoricObservationsOnADate(
    regionCode: string,
    year: string,
    month: string,
    day: string,
    category?: EbirdTaxonomyCategory,
    detailLevel: EbirdObservationDetailLevel = 'simple',
    onlyObservationsFromHotspots = false,
    includeProvisionalObservations = false,
    maxResults?: string,
    rank: EbirdHistoricalObservationRank = 'mrec',
    locations?: string[],
    speciesCommonNameLocale = 'en'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      ...yearMonthDayToUrlParams(year, month, day),
    ];

    const queryParams: QueryParam[] = [
      {
        name: 'cat',
        value: category,
      },
      {
        defaultValue: 'simple',
        name: 'detail',
        value: detailLevel,
      },
      {
        defaultValue: false,
        name: 'hotspot',
        value: onlyObservationsFromHotspots,
      },
      {
        defaultValue: false,
        name: 'includeProvisional',
        value: includeProvisionalObservations,
      },
      {
        name: 'maxResults',
        value: maxResults,
      },
      {
        defaultValue: 'mrec',
        name: 'rank',
        value: rank,
      },
      {
        name: 'r',
        value: locations,
      },
      {
        defaultValue: 'en',
        name: 'sppLocale',
        value: speciesCommonNameLocale,
      },
    ];

    return await curriedMakeRequest(
      'data/obs/{{regionCode}}/historic/{{y}}/{{m}}/{{d}}',
      { urlParams, queryParams }
    );
  };
}
