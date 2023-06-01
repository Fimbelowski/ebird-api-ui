import type QueryParam from './QueryParam';
import { type UrlParam } from '../utilities/ebirdApiClient';

export default interface EbirdApiParams {
  apiKey?: string;
  queryParams?: QueryParam[];
  urlParams?: UrlParam[];
}
