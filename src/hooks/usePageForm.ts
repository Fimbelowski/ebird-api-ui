import { useContext } from 'react';

import PageFormContext from '../context/PageFormContext';

export default function usePageForm() {
  return useContext(PageFormContext);
}
