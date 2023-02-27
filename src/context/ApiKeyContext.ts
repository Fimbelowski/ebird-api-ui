import { createContext } from 'react';

interface ApiKeyContextInterface {
  apiKey: string;
  setApiKey: (newValue: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContextInterface>({
  apiKey: '',
  setApiKey: () => {},
});

export default ApiKeyContext;
