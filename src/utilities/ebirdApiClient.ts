import type EbirdApiParams from '../types/EbirdApiParams';
import type QueryParam from '../types/QueryParam';
import type QueryParamValue from '../types/QueryParamValue';
import type UrlParam from '../types/UrlParam';

const BASE_URL = 'https://api.ebird.org/v2/';

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
    .filter((param): param is QueryParam & { value: QueryParamValue } => {
      const { defaultValue, value } = param;

      if (value === undefined || value === defaultValue) {
        return false;
      }

      if (typeof value === 'string' || Array.isArray(value)) {
        return value.length !== 0;
      }

      return true;
    })
    .map(({ name, value }) => {
      return `${name}=${value.toString()}`;
    })
    .join('&');

  return `?${queryString}`;
}

export default async function makeRequest({
  endpoint,
  apiKey = '',
  urlParams = [],
  queryParams = [],
}: EbirdApiParams) {
  return await fetch(
    `${BASE_URL}${buildEndpointString(endpoint, urlParams)}${buildQueryString(
      queryParams
    )}`,
    {
      headers: {
        'x-ebirdapitoken': apiKey,
      },
    }
  );
}
