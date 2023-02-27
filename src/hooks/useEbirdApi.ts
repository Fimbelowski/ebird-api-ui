import Format from '../types/Format';

const BASE_URL = 'https://api.ebird.org/v2/';

interface QueryParam {
  defaultValue?: string;
  name: string;
  value?: string;
}

interface UrlParam {
  name: string;
  value: string;
}

export default function useEbirdApi() {
  async function baseRequest(
    endpoint: string,
    queryParams: QueryParam[] = [],
    urlParams: UrlParam[] = [],
    apiKey = ''
  ) {
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

  async function getHotspotInfo(locId: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'locId',
        value: locId,
      },
    ];

    return await baseRequest('ref/hotspot/info/{{locId}}', [], urlParams);
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

  async function getRegionHotspots(
    regionCode: string,
    back?: string,
    fmt: Format = Format.Csv
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 'csv',
        name: 'fmt',
        value: fmt,
      },
      {
        name: 'back',
        value: back,
      },
    ];

    return await baseRequest(
      'ref/hotspot/{{regionCode}}',
      queryParams,
      urlParams
    );
  }

  async function getTaxonomyVersions() {
    return await baseRequest('ref/taxonomy/versions');
  }

  return {
    getHotspotInfo,
    getNearbyHotspots,
    getRegionHotspots,
    getTaxonomyVersions,
  };
}