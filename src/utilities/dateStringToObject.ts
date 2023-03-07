export default function dateStringToObject(dateString: string) {
  const parsedDate = Date.parse(dateString);

  if (Number.isNaN(parsedDate)) {
    throw Error(`Invalid date string ${dateString}`);
  }

  const dateStringAsDate = new Date(dateString);
  const year = dateStringAsDate.getUTCFullYear().toString();
  const month = dateStringAsDate.getUTCMonth().toString();
  const day = dateStringAsDate.getUTCDate().toString();

  return {
    year,
    month,
    day,
  };
}
