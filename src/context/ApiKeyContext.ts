import { createContext } from 'react';

interface ApiKeyContext {
  apiKey: string;
  setApiKey: (newValue: string) => void;
}

export default createContext<ApiKeyContext>({
  apiKey: '',
  setApiKey: () => {},
});
