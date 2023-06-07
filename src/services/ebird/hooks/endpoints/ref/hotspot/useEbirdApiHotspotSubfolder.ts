import useEbirdApiRefFolder from '../useEbirdApiRefFolder';

export default async function useEbirdApiHotspotSubfolder(
  ...args: Parameters<typeof useEbirdApiRefFolder>
) {
  const [endpoint, options] = args;
  return await useEbirdApiRefFolder(`hotspot/${endpoint}`, options);
}
