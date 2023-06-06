import csvToArray from '../../utilities/csvToArray';
import dateToUrlParamArray from '../../utilities/dateToUrlParamArray';
import type EbirdChecklist from './types/EbirdChecklist';
import type EbirdChecklistSortKey from './types/EbirdChecklistSortKey';
import type EbirdContributor from './types/EbirdContributor';
import type EbirdRegionType from './types/EbirdRegionType';
import type EbirdRecordFormat from './types/EbirdRecordFormat';
import type EbirdGroupNameLocale from './types/EbirdGroupNameLocale';
import type EbirdHotspot from './types/EbirdHotspot';
import type EbirdLocation from './types/EbirdLocation';
import type EbirdObservation from './types/EbirdObservation';
import type EbirdObservationDetailLevel from './types/EbirdObservationDetailLevel';
import type EbirdRankedBy from './types/EbirdRankedBy';
import type EbirdRegion from './types/EbirdRegion';
import type EbirdRegionInfo from './types/EbirdRegionInfo';
import type EbirdRegionNameFormat from './types/EbirdRegionNameFormat';
import type EbirdRegionStats from './types/EbirdRegionStats';
import type EbirdSpeciesGrouping from './types/EbirdSpeciesGrouping';
import type EbirdTaxaLocaleCode from './types/EbirdTaxaLocaleCode';
import type EbirdTaxonomicGroup from './types/EbirdTaxonomicGroup';
import type EbirdTaxonomyVersion from './types/EbirdTaxonomyVersion';
import type EbirdTaxonomyCategory from './types/EbirdTaxonomyCategory';
import EBIRD_HOTSPOT_CSV_HEADERS from '../../utilities/ebirdHotspotCsvHeaders';
import isJson from '../../utilities/isJson';
import {
  type EbirdApiParams,
  makeRequest,
  type QueryParam,
  type UrlParam,
} from './ebirdApiClient';
import useApiKey from '../../hooks/useApiKey';

interface CsvOptions {
  headers: string[];
  ignoreFirstLine?: boolean;
}

export type EbirdApiParsedResponse<T> = Promise<{
  parsedResponse: T;
  rawResponse: string;
}>;

export default function useEbirdApi() {
  const { apiKey } = useApiKey();

  async function baseRequest<T>(
    endpoint: string,
    options: Omit<EbirdApiParams, 'apiKey'> = {},
    csvOptions?: CsvOptions
  ): EbirdApiParsedResponse<T> {
    return await makeRequest(endpoint, { ...options, apiKey })
      .then(async (response) => await response.text())
      .then((rawResponse) => {
        let parsedResponse: T;

        if (isJson(rawResponse)) {
          parsedResponse = JSON.parse(rawResponse);
        } else if (csvOptions === undefined) {
          throw Error(
            'CSV response detected, but no CSV parsing parameters were provided.'
          );
        } else {
          const { headers, ignoreFirstLine = false } = csvOptions;
          parsedResponse = csvToArray(
            rawResponse,
            headers,
            ignoreFirstLine
          ) as T;
        }

        return {
          parsedResponse,
          rawResponse,
        };
      });
  }

  async function getAdjacentRegions(regionCode: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    return await baseRequest<EbirdRegion[]>('ref/adjacent/{{regionCode}}', {
      urlParams,
    });
  }

  async function getChecklistFeedOnDate(
    regionCode: string,
    date: Date,
    sortKey: EbirdChecklistSortKey = 'obs_dt',
    maxResults = 10
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      ...dateToUrlParamArray(date),
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 'obs_dt',
        name: 'sortKey',
        value: sortKey,
      },
      {
        defaultValue: 10,
        name: 'maxResults',
        value: maxResults,
      },
    ];

    return await baseRequest<EbirdChecklist[]>(
      'product/lists/{{regionCode}}/{{y}}/{{m}}/{{d}}',
      {
        urlParams,
        queryParams,
      }
    );
  }

  async function getHotspotInfo(locId: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'locId',
        value: locId,
      },
    ];

    return await baseRequest<EbirdLocation>('ref/hotspot/info/{{locId}}', {
      urlParams,
    });
  }

  async function getNearbyHotspots(
    lat: number,
    lng: number,
    fmt: EbirdRecordFormat = 'csv',
    back?: number,
    dist?: number
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
        defaultValue: 25,
        name: 'dist',
        value: dist,
      },
    ];

    return await baseRequest<EbirdHotspot[]>(
      'ref/hotspot/geo',
      {
        queryParams,
      },
      {
        headers: EBIRD_HOTSPOT_CSV_HEADERS,
      }
    );
  }

  async function getRecentChecklists(regionCode: string, maxResults?: number) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: '10',
        name: 'maxResults',
        value: maxResults?.toString(),
      },
    ];

    return await baseRequest<EbirdChecklist[]>('product/lists/{{regionCode}}', {
      queryParams,
      urlParams,
    });
  }

  async function getRecentNotableObservationsInAregion(
    regionCode: string,
    back = 14,
    detail: EbirdObservationDetailLevel = 'simple',
    onlyObsFromHotspots = false,
    maxResults?: number,
    obsLocations?: string[],
    locale = 'en'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 14,
        name: 'back',
        value: back,
      },
      {
        defaultValue: 'simple',
        name: 'detail',
        value: detail,
      },
      {
        defaultValue: false,
        name: 'hotspot',
        value: onlyObsFromHotspots,
      },
      {
        name: 'maxResults',
        value: maxResults,
      },
      {
        name: 'r',
        value: obsLocations,
      },
      {
        defaultValue: 'en',
        name: 'sppLocale',
        value: locale,
      },
    ];

    return await baseRequest<EbirdObservation[]>(
      'data/obs/{{regionCode}}/recent/notable',
      {
        urlParams,
        queryParams,
      }
    );
  }

  async function getRecentObservationsInARegion(
    regionCode: string,
    back = 14,
    category?: EbirdTaxonomyCategory,
    onlyObsFromHotspots = false,
    includeProvisional = false,
    maxResults?: number,
    obsLocations?: string[],
    locale = 'en'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 14,
        name: 'back',
        value: back,
      },
      {
        defaultValue: '',
        name: 'cat',
        value: category,
      },
      {
        name: 'hotspot',
        value: onlyObsFromHotspots,
      },
      {
        name: 'includeProvisional',
        value: includeProvisional,
      },
      {
        name: 'maxResults',
        value: maxResults,
      },
      {
        name: 'r',
        value: obsLocations,
      },
      {
        name: 'locale',
        value: locale,
      },
    ];

    return await baseRequest<EbirdObservation[]>(
      'data/obs/{{regionCode}}/recent',
      {
        urlParams,
        queryParams,
      }
    );
  }

  async function getRecentObservationsOfSpeciesInRegion(
    regionCode: string,
    speciesCode: string,
    back = 14,
    onlyObsFromHotspots = false,
    includeProvisional = false,
    maxResults?: number,
    obsLocations?: string[],
    locale = 'en'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      {
        name: 'speciesCode',
        value: speciesCode,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 14,
        name: 'back',
        value: back,
      },
      {
        defaultValue: false,
        name: 'hotspot',
        value: onlyObsFromHotspots,
      },
      {
        defaultValue: false,
        name: 'includeProvisional',
        value: includeProvisional,
      },
      {
        name: 'maxResults',
        value: maxResults,
      },
      {
        name: 'r',
        value: obsLocations,
      },
      {
        defaultValue: 'en',
        name: 'sppLocale',
        value: locale,
      },
    ];

    return await baseRequest<EbirdObservation[]>(
      'data/obs/{{regionCode}}/recent/{{speciesCode}}',
      {
        urlParams,
        queryParams,
      }
    );
  }

  async function getRegionHotspots(
    regionCode: string,
    back?: number,
    fmt: EbirdRecordFormat = 'csv'
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

    return await baseRequest<EbirdHotspot[]>(
      'ref/hotspot/{{regionCode}}',
      {
        urlParams,
        queryParams,
      },
      { headers: EBIRD_HOTSPOT_CSV_HEADERS }
    );
  }

  async function getRegionInfo(
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

    return await baseRequest<EbirdRegionInfo>(
      'ref/region/info/{{regionCode}}',
      {
        urlParams,
        queryParams,
      }
    );
  }

  async function getRegionStatsOnDate(regionCode: string, date: Date) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      ...dateToUrlParamArray(date),
    ];

    return await baseRequest<EbirdRegionStats>(
      'product/stats/{{regionCode}}/{{y}}/{{m}}/{{d}}',
      {
        urlParams,
      }
    );
  }

  async function getSpeciesListForRegion(regionCode: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    return await baseRequest<string[]>('product/spplist/{{regionCode}}', {
      urlParams,
    });
  }

  async function getSubregionList(
    regionType: EbirdRegionType,
    parentRegionCode: string,
    fmt: EbirdRecordFormat = 'csv'
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

    return await baseRequest<EbirdRegion[]>(
      'ref/region/list/{{regionType}}/{{parentRegionCode}}',
      {
        urlParams,
        queryParams,
      },
      { headers: ['code', 'name'], ignoreFirstLine: true }
    );
  }

  async function getTaxaLocaleCodes() {
    return await baseRequest<EbirdTaxaLocaleCode[]>('ref/taxa-locales/ebird');
  }

  async function getTaxonomicForms(speciesCode: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'speciesCode',
        value: speciesCode,
      },
    ];

    return await baseRequest<string[]>('ref/taxon/forms/{{speciesCode}}', {
      urlParams,
    });
  }

  async function getTaxonomicGroups(
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

    return await baseRequest<EbirdTaxonomicGroup[]>(
      'ref/sppgroup/{{speciesGrouping}}',
      {
        urlParams,
        queryParams,
      }
    );
  }

  async function getTaxonomyVersions() {
    return await baseRequest<EbirdTaxonomyVersion[]>('ref/taxonomy/versions');
  }

  async function getTop100(
    regionCode: string,
    date: Date,
    rankedBy: EbirdRankedBy,
    maxResults?: number
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      ...dateToUrlParamArray(date),
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 'spp',
        name: 'rankedBy',
        value: rankedBy,
      },
      {
        name: 'maxResults',
        value: maxResults,
      },
    ];

    return await baseRequest<EbirdContributor[]>(
      'product/top100/{{regionCode}}/{{y}}/{{m}}/{{d}}',
      {
        urlParams,
        queryParams,
      }
    );
  }

  return {
    getAdjacentRegions,
    getChecklistFeedOnDate,
    getHotspotInfo,
    getNearbyHotspots,
    getRecentChecklists,
    getRecentNotableObservationsInAregion,
    getRecentObservationsInARegion,
    getRecentObservationsOfSpeciesInRegion,
    getRegionHotspots,
    getRegionInfo,
    getRegionStatsOnDate,
    getSpeciesListForRegion,
    getSubregionList,
    getTaxaLocaleCodes,
    getTaxonomicForms,
    getTaxonomicGroups,
    getTaxonomyVersions,
    getTop100,
  };
}
