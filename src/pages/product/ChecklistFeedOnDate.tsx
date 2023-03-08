import BasePage from '../../components/BasePage';
import useApiKey from '../../hooks/useApiKey';
import useDate from '../../hooks/useDate';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';

export default function ChecklistFeedOnDate() {
  const { apiKey } = useApiKey();
  const { DateInput, day, month, onChange, year } = useDate();
  const ebirdApi = useEbirdApi();
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
      title="Checklist Feed on a Date"
    />
  );
}
