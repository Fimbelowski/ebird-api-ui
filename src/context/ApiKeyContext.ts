import { createContext } from 'react';

interface IApiKeyContext {
  apiKey: string;
  setApiKey: (newValue: string) => void;
}

export const ApiKeyContext = createContext<IApiKeyContext>({
  apiKey: '',
  setApiKey: () => {},
});
