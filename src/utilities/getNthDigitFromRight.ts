export default function getNthDigitFromRight(value: number, n: number) {
  return Math.floor(Math.abs(value) / Math.pow(10, n - 1)) % 10;
}
