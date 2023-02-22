import { type ChangeEvent } from 'react';

import type SelectOption from '../types/SelectOption';

export default interface SelectProps {
  disabled?: boolean;
  id: string;
  label: string;
  loading?: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  value: string;
}
