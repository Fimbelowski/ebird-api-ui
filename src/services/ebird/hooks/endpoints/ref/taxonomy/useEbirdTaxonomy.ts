import useEbirdApi from '../../../useEbirdApi';
import type EbirdRecordFormat from '../../../../../../types/EbirdRecordFormat';
import type EbirdTaxonomyCategory from '../../../../types/EbirdTaxonomyCategory';
import type {
  QueryParam,
  BaseQueryParam,
} from '../../../../types/EbirdApiParams';

export function useEbirdTaxonomy() {
  const curriedMakeRequest = useEbirdApi();

  return async function getEbirdTaxonomy(
    category: EbirdTaxonomyCategory,
    format: EbirdRecordFormat = 'csv',
    locale = 'en',
    species: string,
    version: string
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

    return await curriedMakeRequest('ref/taxonomy/ebird', { queryParams });
  };
}
