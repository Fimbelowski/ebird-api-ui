import useEbirdApi from '../../../useEbirdApi';
import type EbirdRecordFormat from '../../../../types/EbirdRecordFormat';
import {
  type QueryParam,
  type BaseQueryParam,
} from '../../../../ebirdApiClient';

export type EbirdTaxonomyCategory =
  | 'spuh'
  | 'slash'
  | 'species'
  | 'issf'
  | 'hybrid'
  | 'intergrade'
  | 'domestic'
  | 'form';

export async function useEbirdTaxonomy(
  category: EbirdTaxonomyCategory,
  format: EbirdRecordFormat = 'csv',
  locale = 'en',
  species: string,
  version: number
) {
  const categoryQueryParam: BaseQueryParam<EbirdTaxonomyCategory> = {
    name: 'cat',
    value: category,
  };

  const formatQueryParam: BaseQueryParam<EbirdRecordFormat> = {
    defaultValue: 'csv',
    name: 'fmt',
    value: format,
  };

  const queryParams: QueryParam[] = [
    categoryQueryParam,
    formatQueryParam,
    {
      defaultValue: 'en',
      name: 'locale',
      value: locale,
    },
    {
      name: 'species',
      value: species,
    },
    {
      name: 'version',
      value: version,
    },
  ];

  return await useEbirdApi('ref/taxonomy/ebird', { queryParams });
}
