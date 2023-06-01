import type EbirdApiParams from '../types/EbirdApiParams';
import type QueryParam from '../types/QueryParam';
import type QueryParamValue from '../types/QueryParamValue';
import type UrlParam from '../types/UrlParam';

function buildQueryString(queryParams: QueryParam[]) {
  if (queryParams.length === 0) {
    throw Error('No query params provided.');
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
    requestUrl = mergeUrlParams(requestUrl, urlParams);
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

function mergeUrlParams(endpoint: string, urlParams: UrlParam[]) {
  if (urlParams.length === 0) {
    throw Error('No URL params provided.');
  }

  let mergedUrl = endpoint;

  urlParams.forEach(({ name, value }) => {
    const mergeTag = `{{${name}}}`;

    if (!mergedUrl.includes(mergeTag)) {
      throw Error(`Merge tag "${mergeTag}" not found.`);
    }

    mergedUrl = mergedUrl.replace(`{{${name}}}`, value.toString());
  });

  if (/{{.*}}/.test(mergedUrl)) {
    throw Error(`Unresolved URL params within ${mergedUrl}`);
  }

  return mergedUrl;
}
