import { createContext } from 'react';

import type ApiKeyContext from '../types/ApiKeyContext';

export default createContext<ApiKeyContext>({
  apiKey: '',
  formId: '',
  required: false,
  setApiKey: () => {},
  setFormId: () => {},
  setRequired: () => {},
});
