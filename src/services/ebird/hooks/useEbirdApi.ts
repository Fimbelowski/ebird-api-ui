import type { EbirdApiOptions } from '../ebirdApiClient';
import { makeRequest } from '../ebirdApiClient';
import useApiKey from '../../../hooks/useApiKey';

export default function useEbirdApi() {
  const { apiKey } = useApiKey();

  return async function curriedMakeRequest(
    endpoint: string,
    options?: Omit<EbirdApiOptions, 'apiKey'>
  ) {
    return await makeRequest(endpoint, { ...options, apiKey });
  };
}
