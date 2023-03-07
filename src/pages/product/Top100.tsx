import BasePage from '../../components/BasePage';
import useDate from '../../hooks/useDate';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';

export default function Top100() {
  const { day, month, onChange: onDateChange, year } = useDate();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();
  const { getTop100 } = useEbirdApi();

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
