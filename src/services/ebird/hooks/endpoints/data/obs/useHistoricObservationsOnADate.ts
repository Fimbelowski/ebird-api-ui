import useEbirdApi from '../../../useEbirdApi';
import {
  type QueryParam,
  type BaseQueryParam,
} from '../../../../ebirdApiClient';
import yearMonthDayToUrlParams from '../../../../helpers/yearMonthDayToUrlParams';
import type EbirdObservationDetailLevel from '../../../../types/EbirdObservationDetailLevel';
import type EbirdTaxonomyCategory from '../../../../types/EbirdTaxonomyCategory';
import { type UrlParam } from '../../../../types/EbirdApiParams';

export type EbirdHistoricalObservationRank = 'mrec' | 'create';

export default async function useHistoricObservationsOnADate(
  regionCode: string,
  year: number,
  month: number,
  day: number,
  category?: EbirdTaxonomyCategory,
  detailLevel: EbirdObservationDetailLevel = 'simple',
  hotspot = false,
  includeProvisional = false,
  maxResults?: number,
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

  return await useEbirdApi(
    'data/obs/{{regionCode}}/historic/{{y}}/{{m}}/{{d}}',
    { urlParams, queryParams }
  );
}