import { useState } from 'react';

import BasePage from '../../components/BasePage';
import TextInput from '../../components/TextInput';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';

export default function ViewChecklist() {
  const { getChecklist } = useEbirdApi();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  const [checklistId, setChecklistId] = useState('');

  function onSubmit() {
    setLoading(true);

    getChecklist(checklistId)
      .then(async (response) => await response.text())
      .then((data) => {
        console.log(JSON.parse(data));
        setRawResponse(data);
        setHasQueried(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const formContent = (
    <TextInput
      id="checklist-id"
      label="Checklist ID"
      loading={loading}
      onChange={setChecklistId}
      placeholder="S123545368"
      required
      value={checklistId}
    />
  );

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={onSubmit}
      rawResponse={rawResponse}
      requiresApiKey
      title="View Checklist"
    />
  );
}
