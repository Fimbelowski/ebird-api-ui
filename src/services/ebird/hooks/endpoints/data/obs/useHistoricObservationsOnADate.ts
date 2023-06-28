import useEbirdApi from '../../../useEbirdApi';
import yearMonthDayToUrlParams from '../../../../helpers/yearMonthDayToUrlParams';
import type EbirdObservationDetailLevel from '../../../../../../types/EbirdObservationDetailLevel';
import type EbirdTaxonomyCategory from '../../../../../../types/EbirdTaxonomyCategory';
import type {
  QueryParam,
  BaseQueryParam,
} from '../../../../types/EbirdApiParams';
import type UrlParam from '../../../../types/UrlParam';

export function useHistoricObservationsOnADate() {
  const curriedMakeRequest = useEbirdApi();

  return async function getHistoricObservationsOnADate(
    regionCode: string,
    year: string,
    month: string,
    day: string,
    category?: EbirdTaxonomyCategory,
    detailLevel: EbirdObservationDetailLevel = 'simple',
    hotspot = false,
    includeProvisional = false,
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

    const categoryQueryParam: BaseQueryParam<EbirdTaxonomyCategory> = {
      name: 'cat',
      value: category,
    };

    const detailLevelQueryParam: BaseQueryParam<EbirdObservationDetailLevel> = {
      defaultValue: 'simple',
      name: 'detail',
      value: detailLevel,
    };

    const rankQueryParam: BaseQueryParam<EbirdHistoricalObservationRank> = {
      defaultValue: 'mrec',
      name: 'rank',
      value: rank,
    };

    const queryParams: QueryParam[] = [
      categoryQueryParam,
      detailLevelQueryParam,
      {
        defaultValue: false,
        name: 'hotspot',
        value: hotspot,
      },
      {
        defaultValue: false,
        name: 'includeProvisional',
        value: includeProvisional,
      },
      {
        name: 'maxResults',
        value: maxResults,
      },
      rankQueryParam,
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
