import useEbirdApi from '../../../useEbirdApi';
import { type UrlParam } from '../../../../types/EbirdApiParams';

export default function useTaxonomicForms(speciesCode: string) {
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
