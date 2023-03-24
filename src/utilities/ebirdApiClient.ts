import type EbirdApiParams from '../types/EbirdApiParams';
import type QueryParam from '../types/QueryParam';
import type UrlParam from '../types/UrlParam';

const BASE_URL = 'https://api.ebird.org/v2/';

function buildEndpointString(endpoint: string, urlParams: UrlParam[] = []) {
  let builtEndpoint = endpoint;

  urlParams.forEach(({ name, value }) => {
    const mergeTag = `{{${name}}}`;

    if (!builtEndpoint.includes(mergeTag)) {
      throw Error(`Merge tag "${mergeTag}" not found.`);
    }

    builtEndpoint = builtEndpoint.replace(`{{${name}}}`, value);
  });

  return builtEndpoint;
}

function buildQueryString(queryParams: QueryParam[]) {
  if (queryParams.length === 0) {
    return '';
  }

  const queryParamsAsStrings = queryParams
    .map(({ defaultValue, name, value }) => {
      if (value === defaultValue) {
        return '';
      }

      const computedValue = value ?? defaultValue ?? '';

      if (computedValue === '') {
        return computedValue;
      }

      return `${name}=${computedValue}`;
    })
    .filter((queryParamAsString) => queryParamAsString !== '');

  return `?${queryParamsAsStrings.join('&')}`;
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
