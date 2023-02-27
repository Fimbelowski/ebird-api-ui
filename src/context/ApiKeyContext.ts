import { createContext } from 'react';

import type ApiKeyContextInterface from '../types/ApiKeyContext';

const ApiKeyContext = createContext<ApiKeyContextInterface>({
  apiKey: '',
  required: false,
  setApiKey: () => {},
  setRequired: () => {},
});

export default ApiKeyContext;
