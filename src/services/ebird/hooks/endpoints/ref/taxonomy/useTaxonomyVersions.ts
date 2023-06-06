import useEbirdApi from '../../../useEbirdApi';

export default async function useTaxonomyVersions() {
  return await useEbirdApi('ref/taxonomy/versions');
}
