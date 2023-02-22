import Format from '../types/Format';

const BASE_URL = 'https://api.ebird.org/v2/';

interface QueryParam {
  defaultValue?: string;
  name: string;
  value?: string;
}

export default function useEbirdApi() {
  async function baseRequest(
    endpoint: string,
    queryParams: QueryParam[],
    apiKey = ''
  ) {
    return await fetch(
      `${BASE_URL}${endpoint}${buildQueryString(queryParams)}`,
      {
        headers: {
          'x-ebirdapitoken': apiKey,
        },
      }
    );
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

  async function getNearbyHotspots(
    lat: string,
    lng: string,
    fmt: Format = Format.Csv,
    back?: string,
    dist?: string
  ) {
    const queryParams: QueryParam[] = [
      {
        name: 'lat',
        value: lat,
      },
      {
        name: 'lng',
        value: lng,
      },
      {
        defaultValue: 'csv',
        name: 'fmt',
        value: fmt,
      },
      {
        name: 'back',
        value: back,
      },
      {
        defaultValue: '25',
        name: 'dist',
        value: dist,
      },
    ];

    return await baseRequest('ref/hotspot/geo', queryParams);
  }

  return {
    getNearbyHotspots,
  };
}
