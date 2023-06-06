import type { EbirdApiParams } from '../ebirdApiClient';
import { makeRequest } from '../ebirdApiClient';
import useApiKey from '../../../hooks/useApiKey';

export default async function useEbirdApi(
  endpoint: string,
  options?: Omit<EbirdApiParams, 'apiKey'>
) {
  const { apiKey } = useApiKey();

  return await makeRequest(endpoint, { ...options, apiKey });
}
