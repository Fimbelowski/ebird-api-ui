import type { EbirdApiOptions } from '../ebirdApiClient';
import { makeRequest } from '../ebirdApiClient';
import useApiKey from '../../../hooks/useApiKey';

export default async function useEbirdApi(
  endpoint: string,
  options?: Omit<EbirdApiOptions, 'apiKey'>
) {
  const { apiKey } = useApiKey();

  return await makeRequest(endpoint, { ...options, apiKey });
}
