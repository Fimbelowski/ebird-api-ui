import useEbirdApi from '../../../useEbirdApi';

export default async function useTaxonomyVersions() {
  const curriedMakeRequest = useEbirdApi();

  return async function getTaxonomyVersions() {
    return await curriedMakeRequest('ref/taxonomy/versions');
  };
}
