import { useContext } from 'react';

import LoadingContext from '../context/LoadingContext';

export default function useLoading() {
  return useContext(LoadingContext);
}
