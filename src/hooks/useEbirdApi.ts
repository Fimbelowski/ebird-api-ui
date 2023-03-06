import type EbirdRegionType from '../types/EbirdRegionType';
import type EbirdFormat from '../types/EbirdFormat';
import type EbirdGroupNameLocale from '../types/EbirdGroupNameLocale';
import type EbirdRegionNameFormat from '../types/EbirdRegionNameFormat';
import type EbirdSpeciesGrouping from '../types/EbirdSpeciesGrouping';

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
    apiKey = '',
    urlParams: UrlParam[] = [],
    queryParams: QueryParam[] = []
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

  async function getAdjacentRegions(apiKey: string, regionCode: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    return await baseRequest('ref/adjacent/{{regionCode}}', apiKey, urlParams);
  }

  async function getHotspotInfo(locId: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'locId',
        value: locId,
      },
    ];

    return await baseRequest('ref/hotspot/info/{{locId}}', '', urlParams, []);
  }

  async function getNearbyHotspots(
    lat: string,
    lng: string,
    fmt: EbirdFormat = 'csv',
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

    return await baseRequest('ref/hotspot/geo', '', [], queryParams);
  }

  async function getRegionHotspots(
    regionCode: string,
    back?: string,
    fmt: EbirdFormat = 'csv'
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
      '',
      urlParams,
      queryParams
    );
  }

  async function getRegionInfo(
    apiKey: string,
    regionCode: string,
    regionNameFormat: EbirdRegionNameFormat,
    delim: string
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 'full',
        name: 'regionNameFormat',
        value: regionNameFormat,
      },
      {
        defaultValue: ', ',
        name: 'delim',
        value: delim,
      },
    ];

    return await baseRequest(
      'ref/region/info/{{regionCode}}',
      apiKey,
      urlParams,
      queryParams
    );
  }

  async function getRegionStatsOnDate(
    apiKey: string,
    regionCode: string,
    y: number,
    m: number,
    d: number
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      {
        name: 'y',
        value: y.toString(),
      },
      {
        name: 'm',
        value: m.toString(),
      },
      {
        name: 'd',
        value: d.toString(),
      },
    ];

    return await baseRequest(
      'product/stats/{{regionCode}}/{{y}}/{{m}}/{{d}}',
      apiKey,
      urlParams
    );
  }

  async function getSpeciesListForRegion(apiKey: string, regionCode: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    return await baseRequest(
      'product/spplist/{{regionCode}}',
      apiKey,
      urlParams
    );
  }

  async function getSubregionList(
    apiKey: string,
    regionType: EbirdRegionType,
    parentRegionCode: string,
    fmt: EbirdFormat = 'csv'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionType',
        value: regionType,
      },
      {
        name: 'parentRegionCode',
        value: parentRegionCode,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 'json',
        name: 'fmt',
        value: fmt,
      },
    ];

    return await baseRequest(
      'ref/region/list/{{regionType}}/{{parentRegionCode}}',
      apiKey,
      urlParams,
      queryParams
    );
  }

  async function getTaxaLocaleCodes(apiKey: string) {
    return await baseRequest('ref/taxa-locales/ebird', apiKey);
  }

  async function getTaxonomicGroups(
    apiKey: string,
    speciesGrouping: EbirdSpeciesGrouping,
    groupNameLocale: EbirdGroupNameLocale
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'speciesGrouping',
        value: speciesGrouping,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 'en',
        name: 'groupNameLocale',
        value: groupNameLocale,
      },
    ];

    return await baseRequest(
      'ref/sppgroup/{{speciesGrouping}}',
      apiKey,
      urlParams,
      queryParams
    );
  }

  async function getTaxonomyVersions() {
    return await baseRequest('ref/taxonomy/versions');
  }

  return {
    getAdjacentRegions,
    getHotspotInfo,
    getNearbyHotspots,
    getRegionHotspots,
    getRegionInfo,
    getRegionStatsOnDate,
    getSpeciesListForRegion,
    getSubregionList,
    getTaxaLocaleCodes,
    getTaxonomicGroups,
    getTaxonomyVersions,
  };
}
