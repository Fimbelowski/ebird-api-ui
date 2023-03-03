import BasePage from '../../../components/BasePage';
import useApiKey from '../../../hooks/useApiKey';
import useRequestState from '../../../hooks/useRequestState';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function RegionInfo() {
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
      title="Region Info"
    />
  );
}
