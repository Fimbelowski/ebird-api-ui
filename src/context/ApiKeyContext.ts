import { createContext } from 'react';

interface ApiKeyContextInterface {
  apiKey: string;
  setApiKey: (newValue: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContextInterface>({
  apiKey: '',
  setApiKey: () => {
    throw Error('The context provider has not overridden the default values.');
  },
});

export default ApiKeyContext;
