import useEbirdApi from '../../../useEbirdApi';
import type EbirdRecordFormat from '../../../../../../types/EbirdRecordFormat';
import type EbirdTaxonomyCategory from '../../../../../../types/EbirdTaxonomyCategory';
import type QueryParam from '../../../../types/QueryParam';

export function useEbirdTaxonomy() {
  const curriedMakeRequest = useEbirdApi();

  return async function getEbirdTaxonomy(
    category: EbirdTaxonomyCategory,
    format: EbirdRecordFormat = 'csv',
    locale = 'en',
    species: string,
    version: string
  ) {
    const queryParams: QueryParam[] = [
      {
        name: 'cat',
        value: category,
      },
      {
        defaultValue: 'csv',
        name: 'fmt',
        value: format,
      },
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

    return await curriedMakeRequest('ref/taxonomy/ebird', { queryParams });
  };
}
