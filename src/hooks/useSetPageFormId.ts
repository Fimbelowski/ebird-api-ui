import { useEffect } from 'react';

import usePageForm from './usePageForm';

export default function useSetPageFormId(formId: string) {
  const { setFormId } = usePageForm();

  useEffect(() => {
    setFormId(formId);
  }, []);
}
