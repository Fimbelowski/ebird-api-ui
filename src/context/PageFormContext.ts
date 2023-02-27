import { createContext } from 'react';

interface PageFormContext {
  formId: string;
  setFormId: (newValue: string) => void;
}

export default createContext<PageFormContext>({
  formId: '',
  setFormId: () => {},
});
