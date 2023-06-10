import { createContext } from 'react';

interface LoadingContext {
  loading: boolean;
  setLoading: (newValue: boolean) => void;
}

export default createContext<LoadingContext>({
  loading: false,
  setLoading: () => {},
});
