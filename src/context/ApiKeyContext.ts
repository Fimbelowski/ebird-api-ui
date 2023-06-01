import { createContext } from 'react';

interface IApiKeyContext {
  apiKey: string;
  setApiKey: (newValue: string) => void;
}

export default createContext<IApiKeyContext>({
  apiKey: '',
  setApiKey: () => {},
});
