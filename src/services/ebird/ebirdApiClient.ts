export interface EbirdApiParams {
  apiKey?: string;
  queryParams?: QueryParam[];
  urlParams?: UrlParam[];
}

interface BaseQueryParam<T extends QueryParamValue> {
  defaultValue?: T;
  name: string;
  value: T | undefined;
}

export type QueryParam =
  | BaseQueryParam<boolean>
  | BaseQueryParam<number>
  | BaseQueryParam<string>
  | BaseQueryParam<string[]>;

type QueryParamValue = boolean | number | string | string[];

export interface UrlParam {
  name: string;
  value: string | number;
}

function buildQueryString(queryParams: QueryParam[]) {
  if (queryParams.length === 0) {
    throw Error('No query params provided.');
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

export async function makeRequest(
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
