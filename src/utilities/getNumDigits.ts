export default function getNumDigits(value: number) {
  return Math.floor(Math.log10(Math.abs(value)) + 1);
}
