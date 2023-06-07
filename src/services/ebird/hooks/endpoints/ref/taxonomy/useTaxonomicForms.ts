import useEbirdApi from '../../../useEbirdApi';
import { type UrlParam } from '../../../../types/EbirdApiParams';

export default async function useTaxonomicForms(speciesCode: string) {
  const urlParams: UrlParam[] = [
    {
      name: 'speciesCode',
      value: speciesCode,
    },
  ];

  return await useEbirdApi('ref/taxon/forms/{{speciesCode}}', { urlParams });
}
