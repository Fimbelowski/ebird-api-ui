const BASE_URL = 'https://api.ebird.org/v2/';

interface QueryParam {
  defaultValue?: string;
  name: string;
  value?: string;
}

export default function useEbirdApi() {
  async function baseRequest(
    endpoint: string,
    apiKey: string,
    queryParams: QueryParam[]
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
    apiKey: string,
    lat: string,
    lng: string,
    fmt?: 'csv' | 'json',
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

    return await baseRequest('ref/hotspot/geo', apiKey, queryParams);
  }

  return {
    getNearbyHotspots,
  };
}
