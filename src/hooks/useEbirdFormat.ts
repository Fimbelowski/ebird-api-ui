import { useState } from 'react';

import type EbirdFormat from '../types/EbirdFormat';
import FormatSelect from '../components/FormatSelect';

export default function useEbirdFormat() {
  const [format, setFormat] = useState<EbirdFormat>('csv');

  return {
    format,
    FormatSelect,
    setFormat,
  };
}
