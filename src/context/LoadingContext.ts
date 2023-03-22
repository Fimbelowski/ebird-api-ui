import { createContext } from 'react';

import type LoadingContext from '../types/LoadingContext';

export default createContext<LoadingContext>({
  loading: false,
  setLoading: () => {},
});
