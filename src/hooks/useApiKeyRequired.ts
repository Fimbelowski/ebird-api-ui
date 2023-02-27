import { useContext, useEffect } from 'react';

import ApiKeyContext from '../context/ApiKeyContext';

export default function useApiKeyRequired(required: boolean) {
  const { setRequired } = useContext(ApiKeyContext);

  useEffect(() => {
    setRequired(required);
  }, []);
}
