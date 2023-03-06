import BasePage from '../../components/BasePage';
import useApiKey from '../../hooks/useApiKey';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';

export default function RegionalStatsOnDate() {
  const { apiKey } = useApiKey();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  return (
    <BasePage
      hasQueried={hasQueried}
      loading={loading}
      rawResponse={rawResponse}
      requiresApiKey
      title="Regional Statistics on a Date"
    />
  );
}
