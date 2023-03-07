import BasePage from '../../components/BasePage';
import useApiKey from '../../hooks/useApiKey';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';

export default function Top100() {
  const { apiKey } = useApiKey();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();
  const ebirdApi = useEbirdApi();

  return (
    <BasePage
      hasQueried={hasQueried}
      loading={loading}
      rawResponse={rawResponse}
      requiresApiKey
      title="Top 100"
    />
  );
}
