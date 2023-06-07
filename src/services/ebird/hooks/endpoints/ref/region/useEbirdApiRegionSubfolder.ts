import useEbirdApiRefFolder from '../useEbirdApiRefFolder';

export default async function useEbirdApiRegionSubfolder(
  ...args: Parameters<typeof useEbirdApiRefFolder>
) {
  const [endpoint, options] = args;
  return await useEbirdApiRefFolder(`region/${endpoint}`, options);
}
