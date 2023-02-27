import { useEffect } from 'react';

import useApiKey from './useApiKey';

export default function useApiKeyRequired(required: boolean) {
  const { setRequired } = useApiKey();

  useEffect(() => {
    setRequired(required);
  }, []);
}
