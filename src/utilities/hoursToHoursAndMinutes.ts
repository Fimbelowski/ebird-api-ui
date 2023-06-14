export default function hoursToHoursAndMinutes(durationHrs: number) {
  const wholeHours = Math.floor(durationHrs / 1);
  const fractionalHours = durationHrs % 1;
  const fractionalHoursAsWholeMinutes = Math.round(fractionalHours * 60);

  let durationAsString = '';

  if (wholeHours > 0) {
    durationAsString += `${wholeHours}hour${wholeHours === 1 ? '' : 's'}`;

    if (fractionalHoursAsWholeMinutes > 0) {
      durationAsString += ', ';
    }
  }

  if (fractionalHoursAsWholeMinutes > 0) {
    durationAsString += `${fractionalHoursAsWholeMinutes}minute${
      fractionalHoursAsWholeMinutes === 1 ? '' : 's'
    }`;
  }

  return durationAsString;
}
