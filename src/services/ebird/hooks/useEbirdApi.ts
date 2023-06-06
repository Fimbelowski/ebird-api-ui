import type { EbirdApiParams } from '../ebirdApiClient';
import { makeRequest } from '../ebirdApiClient';
import useApiKey from '../../../hooks/useApiKey';

export type EbirdApiParamsWithoutApiKey = Omit<EbirdApiParams, 'apiKey'>;

export async function useEbirdApi(
  endpoint: string,
  options: EbirdApiParamsWithoutApiKey
) {
  const { apiKey } = useApiKey();

  return await makeRequest(endpoint, { ...options, apiKey });
}
