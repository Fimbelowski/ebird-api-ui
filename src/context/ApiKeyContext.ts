import { createContext } from 'react';

import type ApiKeyContextInterface from '../types/ApiKeyContext';

const ApiKeyContext = createContext<ApiKeyContextInterface>({
  apiKey: '',
  formId: '',
  required: false,
  setApiKey: () => {},
  setFormId: () => {},
  setRequired: () => {},
});

export default ApiKeyContext;