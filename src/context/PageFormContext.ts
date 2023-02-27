import { createContext } from 'react';

import type PageFormContext from '../types/PageFormContext';

export default createContext<PageFormContext>({
  formId: '',
  setFormId: () => {},
});
