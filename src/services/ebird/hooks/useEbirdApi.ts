import type { EbirdApiOptions } from '../ebirdApiClient';
import { makeRequest } from '../ebirdApiClient';
import useAppSelector from '../../../store/hooks/useAppSelector';

export default function useEbirdApi() {
  const apiKey = useAppSelector((state) => state.apiKey.value);

  return async function curriedMakeRequest(
    endpoint: string,
    options?: Omit<EbirdApiOptions, 'apiKey'>
  ) {
    return await makeRequest(endpoint, { ...options, apiKey });
  };
}
