export default function dateStringToYearMonthDay(
  dateString: string
): [string, string, string] {
  const [year, month, day] = dateString.split('-');

  return [year, month, day];
}
