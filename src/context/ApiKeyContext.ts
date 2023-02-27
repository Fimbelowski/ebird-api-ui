import { createContext } from 'react';

import type ApiKeyContextInterface from '../types/ApiKeyContext';

export default createContext<ApiKeyContextInterface>({
  apiKey: '',
  formId: '',
  required: false,
  setApiKey: () => {},
  setFormId: () => {},
  setRequired: () => {},
});
