import { createContext } from 'react';

interface LoadingContext {
  loading: boolean;
  loadingPosition: boolean;
  setLoading: (newValue: boolean) => void;
  setLoadingPosition: (newValue: boolean) => void;
}

export default createContext<LoadingContext>({
  loading: false,
  loadingPosition: false,
  setLoading: () => {},
  setLoadingPosition: () => {},
});
