import { createContext } from 'react';

interface ApiKeyContextInterface {
  apiKey: string;
  required: boolean;
  setApiKey: (newValue: string) => void;
  setRequired: (newValue: boolean) => void;
}

const ApiKeyContext = createContext<ApiKeyContextInterface>({
  apiKey: '',
  required: false,
  setApiKey: () => {},
  setRequired: () => {},
});

export default ApiKeyContext;
