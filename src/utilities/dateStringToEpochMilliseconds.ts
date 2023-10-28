export default function dateStringToEpochMilliseconds(dateString = '') {
  return new Date(dateString).valueOf();
}
