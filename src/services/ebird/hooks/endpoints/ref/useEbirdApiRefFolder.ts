import useEbirdApi from '../../useEbirdApi';

export default async function useEbirdApiRefFolder(
  ...args: Parameters<typeof useEbirdApi>
) {
  const [endpoint, options] = args;
  return await useEbirdApi(`ref/${endpoint}`, options);
}
