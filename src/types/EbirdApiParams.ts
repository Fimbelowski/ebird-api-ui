import type QueryParam from './QueryParam';
import type UrlParam from './UrlParam';

export default interface EbirdApiParams {
  apiKey?: string;
  endpoint: string;
  queryParams?: QueryParam[];
  urlParams?: UrlParam[];
}