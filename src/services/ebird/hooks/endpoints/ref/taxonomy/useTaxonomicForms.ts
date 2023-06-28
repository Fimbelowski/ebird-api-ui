import useEbirdApi from '../../../useEbirdApi';
import type UrlParam from '../../../../types/UrlParam';

export default function useTaxonomicForms() {
  const curriedMakeRequest = useEbirdApi();

  return async function getTaxonomicForms(speciesCode: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'speciesCode',
        value: speciesCode,
      },
    ];

    return await curriedMakeRequest('ref/taxon/forms/{{speciesCode}}', {
      urlParams,
    });
  };
}
