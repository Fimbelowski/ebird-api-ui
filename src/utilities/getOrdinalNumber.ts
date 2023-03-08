export default function getOrdinalNumber(value: number) {
  const lastDigit = value % 10;
  const lastTwoDigits = value % 100;

  let suffix = 'th';

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    suffix = 'st';
  } else if (lastDigit === 2 && lastTwoDigits !== 12) {
    suffix = 'nd';
  } else if (lastDigit === 3 && lastTwoDigits !== 13) {
    suffix = 'rd';
  }

  return `${value}${suffix}`;
}
