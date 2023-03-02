import csvToArray from './csvToArray';
import isJson from './isJson';

export default function parseRequestData(
  data: string,
  csvHeaders: string[],
  ignoreFirstLine = false
) {
  return isJson(data)
    ? JSON.parse(data)
    : csvToArray(data, csvHeaders, ignoreFirstLine);
}
