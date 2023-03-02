import csvToArray from './csvToArray';
import isJson from './isJson';

export default function parseRequestData(data: string, csvHeaders: string[]) {
  return isJson(data) ? JSON.parse(data) : csvToArray(data, csvHeaders);
}
