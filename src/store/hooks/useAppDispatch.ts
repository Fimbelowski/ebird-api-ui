import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../store';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
