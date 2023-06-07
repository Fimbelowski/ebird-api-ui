import useEbirdApi from '../../../useEbirdApi';
import { type EbirdTaxonomyCategory } from '../../ref/taxonomy/useEbirdTaxonomy';
import {
  type UrlParam,
  type QueryParam,
  type BaseQueryParam,
} from '../../../../ebirdApiClient';

export default async function useRecentObservationsInARegion(
  regionCode: string,
  back = 14,
  category?: EbirdTaxonomyCategory,
  hotspot = false,
  includeProvisional = false,
  maxResults?: number,
  locations?: string[],
  speciesCommonNameLocale = 'en'
) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
  ];

  const categoryQueryParam: BaseQueryParam<EbirdTaxonomyCategory> = {
    name: 'cat',
    value: category,
  };

  const queryParams: QueryParam[] = [
    {
      defaultValue: 14,
      name: 'back',
      value: back,
    },
    categoryQueryParam,
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

  return await useEbirdApi('data/obs/{{regionCode}}/recent', {
    urlParams,
    queryParams,
  });
}
