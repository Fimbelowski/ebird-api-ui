import { useContext } from 'react';

import ApiKeyContext from '../context/ApiKeyContext';

export default function useApiKey() {
  return useContext(ApiKeyContext);
}
