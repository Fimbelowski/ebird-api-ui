import { useState } from 'react';

import type EbirdFormat from '../types/EbirdFormat';

export default function useFormatState() {
  const [format, setFormat] = useState<EbirdFormat>('csv');

  return {
    format,
    setFormat,
  };
}
