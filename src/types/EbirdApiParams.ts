import { type QueryParam, type UrlParam } from '../utilities/ebirdApiClient';

export default interface EbirdApiParams {
  apiKey?: string;
  queryParams?: QueryParam[];
  urlParams?: UrlParam[];
}
