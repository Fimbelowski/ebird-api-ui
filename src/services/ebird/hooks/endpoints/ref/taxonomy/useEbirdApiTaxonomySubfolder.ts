import useEbirdApiRefFolder from '../useEbirdApiRefFolder';

export default async function useEbirdApiTaxonomySubfolder(
  ...args: Parameters<typeof useEbirdApiRefFolder>
) {
  const [endpoint, options] = args;
  return await useEbirdApiRefFolder(`taxonomy/${endpoint}`, options);
}
