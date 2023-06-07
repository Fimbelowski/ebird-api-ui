import useEbirdApi from '../../../useEbirdApi';
import { type EbirdTaxonomyCategory } from '../../ref/taxonomy/useEbirdTaxonomy';
import {
  type UrlParam,
  type QueryParam,
  type BaseQueryParam,
} from '../../../../ebirdApiClient';

type DetailLevel = 'simple' | 'full';

type Rank = 'mrec' | 'create';

export default async function useHistoricObservationsOnADate(
  regionCode: string,
  year: number,
  month: number,
  day: number,
  category?: EbirdTaxonomyCategory,
  detailLevel: DetailLevel = 'simple',
  hotspot = false,
  includeProvisional = false,
  maxResults?: number,
  rank: Rank = 'mrec',
  locations?: string[],
  speciesCommonNameLocale = 'en'
) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
    {
      name: 'y',
      value: year,
    },
    {
      name: 'm',
      value: month,
    },
    {
      name: 'd',
      value: day,
    },
  ];

  const categoryQueryParam: BaseQueryParam<EbirdTaxonomyCategory> = {
    name: 'cat',
    value: category,
  };

  const detailLevelQueryParam: BaseQueryParam<DetailLevel> = {
    defaultValue: 'simple',
    name: 'detail',
    value: detailLevel,
  };

  const rankQueryParam: BaseQueryParam<Rank> = {
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
