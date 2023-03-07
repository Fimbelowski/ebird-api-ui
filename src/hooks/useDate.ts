import { useState } from 'react';

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
    setMonth(dateStringAsDate.getUTCMonth().toString());
    setDay(dateStringAsDate.getUTCDate().toString());
  }

  return { day, month, onChange, year };
}
