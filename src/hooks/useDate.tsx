import { useState } from 'react';

import DateInput from '../components/DateInput';

export default function useDate() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  function onChange(value: string) {
    const parsedDate = Date.parse(value);

    if (Number.isNaN(parsedDate)) {
      throw Error(`Invalid date string ${value}`);
    }

    const dateStringAsDate = new Date(value);

    setYear(dateStringAsDate.getUTCFullYear().toString());
    setMonth((dateStringAsDate.getUTCMonth() + 1).toString());
    setDay(dateStringAsDate.getUTCDate().toString());
  }

  return { DateInput, day, month, onChange, year };
}
