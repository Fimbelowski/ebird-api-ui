export default function dateStringToYearMonthDay(
  dateString: string
): [number, number, number] {
  const [year, month, day] = dateString
    .split('-')
    .map((fragment) => parseInt(fragment));

  return [year, month, day];
}
