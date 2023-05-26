import type EbirdApiParams from '../types/EbirdApiParams';
import type QueryParam from '../types/QueryParam';
import type QueryParamValue from '../types/QueryParamValue';
import type UrlParam from '../types/UrlParam';

function buildEndpointString(endpoint: string, urlParams: UrlParam[] = []) {
  let builtEndpoint = endpoint;

  urlParams.forEach(({ name, value }) => {
    const mergeTag = `{{${name}}}`;

    if (!builtEndpoint.includes(mergeTag)) {
      throw Error(`Merge tag "${mergeTag}" not found.`);
    }

    builtEndpoint = builtEndpoint.replace(`{{${name}}}`, value.toString());
  });

  return builtEndpoint;
}

function buildQueryString(queryParams: QueryParam[]) {
  if (queryParams.length === 0) {
    return '';
  }

  const queryString = queryParams
    .filter(
      (
        param
      ): param is QueryParam & { value: NonNullable<QueryParamValue> } => {
        const { defaultValue, value } = param;

        if (value === undefined || value === defaultValue) {
          return false;
        }

        if (typeof value === 'string' || Array.isArray(value)) {
          return value.length !== 0;
        }

        return true;
      }
    )
    .map(({ name, value }) => {
      return `${name}=${value.toString()}`;
    })
    .join('&');

  return `?${queryString}`;
}

export default async function makeRequest(
  endpoint: string,
  options: EbirdApiParams = {}
) {
  const { apiKey, queryParams, urlParams } = options;

  let requestUrl = `https://api.ebird.org/v2/${endpoint}`;

  if (urlParams !== undefined) {
    requestUrl = buildEndpointString(requestUrl, urlParams);
  }

  if (queryParams !== undefined) {
    requestUrl += buildQueryString(queryParams);
  }

  return await fetch(requestUrl, {
    headers: {
      'x-ebirdapitoken': apiKey ?? '',
    },
  });
}
