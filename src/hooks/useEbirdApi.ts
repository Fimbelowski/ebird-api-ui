import csvToArray from '../utilities/csvToArray';
import type EbirdApiClientResponse from '../types/EbirdApiClientResponse';
import type EbirdApiParams from '../types/EbirdApiParams';
import type EbirdChecklist from '../types/EbirdChecklist';
import type EbirdChecklistSortKey from '../types/EbirdChecklistSortKey';
import type EbirdContributor from '../types/EbirdContributor';
import type EbirdRegionType from '../types/EbirdRegionType';
import type EbirdFormat from '../types/EbirdFormat';
import type EbirdGroupNameLocale from '../types/EbirdGroupNameLocale';
import type EbirdHotspot from '../types/EbirdHotspot';
import type EbirdLocation from '../types/EbirdLocation';
import type EbirdRankedBy from '../types/EbirdRankedBy';
import type EbirdRegion from '../types/EbirdRegion';
import type EbirdRegionInfo from '../types/EbirdRegionInfo';
import type EbirdRegionNameFormat from '../types/EbirdRegionNameFormat';
import type EbirdRegionStats from '../types/EbirdRegionStats';
import type EbirdSpeciesGrouping from '../types/EbirdSpeciesGrouping';
import type EbirdTaxaLocaleCode from '../types/EbirdTaxaLocaleCode';
import type EbirdTaxonomicGroup from '../types/EbirdTaxonomicGroup';
import type EbirdTaxonomyVersion from '../types/EbirdTaxonomyVersion';
import EBIRD_HOTSPOT_CSV_HEADERS from '../utilities/ebirdHotspotCsvHeaders';
import isJson from '../utilities/isJson';
import makeRequest from '../utilities/ebirdApiClient';
import type QueryParam from '../types/QueryParam';
import type UrlParam from '../types/UrlParam';
import useApiKey from './useApiKey';

interface CsvOptions {
  headers: string[];
  ignoreFirstLine?: boolean;
}

export default function useEbirdApi() {
  const { apiKey } = useApiKey();

  async function baseRequest<T>(
    {
      endpoint,
      queryParams = [],
      urlParams = [],
    }: Omit<EbirdApiParams, 'apiKey'>,
    csvOptions?: CsvOptions
  ): EbirdApiClientResponse<T> {
    return await makeRequest({ endpoint, apiKey, queryParams, urlParams })
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

    return await baseRequest<EbirdRegion[]>({
      endpoint: 'ref/adjacent/{{regionCode}}',
      urlParams,
    });
  }

  async function getChecklistFeedOnDate(
    regionCode: string,
    year: string,
    month: string,
    day: string,
    sortKey: EbirdChecklistSortKey = 'obs_dt',
    maxResults = '10'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      {
        name: 'y',
        value: year,
      },
      {
        name: 'm',
        value: month,
      },
      {
        name: 'd',
        value: day,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 'obs_dt',
        name: 'sortKey',
        value: sortKey,
      },
      {
        defaultValue: '10',
        name: 'maxResults',
        value: maxResults,
      },
    ];

    return await baseRequest<EbirdChecklist[]>({
      endpoint: 'product/lists/{{regionCode}}/{{y}}/{{m}}/{{d}}',
      urlParams,
      queryParams,
    });
  }

  async function getHotspotInfo(locId: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'locId',
        value: locId,
      },
    ];

    return await baseRequest<EbirdLocation>({
      endpoint: 'ref/hotspot/info/{{locId}}',
      urlParams,
    });
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

    return await baseRequest<EbirdHotspot[]>(
      {
        endpoint: 'ref/hotspot/geo',
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

    return await makeRequest({
      endpoint: 'product/lists/{{regionCode}}',
      queryParams,
      urlParams,
    });
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

    return await baseRequest<EbirdHotspot[]>(
      {
        endpoint: 'ref/hotspot/{{regionCode}}',
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

    return await baseRequest<EbirdRegionInfo>({
      endpoint: 'ref/region/info/{{regionCode}}',
      urlParams,
      queryParams,
    });
  }

  async function getRegionStatsOnDate(
    regionCode: string,
    year: string,
    month: string,
    day: string
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      {
        name: 'y',
        value: year,
      },
      {
        name: 'm',
        value: month,
      },
      {
        name: 'd',
        value: day,
      },
    ];

    return await baseRequest<EbirdRegionStats>({
      endpoint: 'product/stats/{{regionCode}}/{{y}}/{{m}}/{{d}}',
      urlParams,
    });
  }

  async function getSpeciesListForRegion(regionCode: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    return await baseRequest<string[]>({
      endpoint: 'product/spplist/{{regionCode}}',
      urlParams,
    });
  }

  async function getSubregionList(
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

    return await baseRequest<EbirdRegion[]>(
      {
        endpoint: 'ref/region/list/{{regionType}}/{{parentRegionCode}}',
        urlParams,
        queryParams,
      },
      { headers: ['code', 'name'], ignoreFirstLine: true }
    );
  }

  async function getTaxaLocaleCodes() {
    return await baseRequest<EbirdTaxaLocaleCode[]>({
      endpoint: 'ref/taxa-locales/ebird',
    });
  }

  async function getTaxonomicForms(speciesCode: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'speciesCode',
        value: speciesCode,
      },
    ];

    return await baseRequest<string[]>({
      endpoint: 'ref/taxon/forms/{{speciesCode}}',
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

    return await baseRequest<EbirdTaxonomicGroup[]>({
      endpoint: 'ref/sppgroup/{{speciesGrouping}}',
      urlParams,
      queryParams,
    });
  }

  async function getTaxonomyVersions() {
    return await baseRequest<EbirdTaxonomyVersion[]>({
      endpoint: 'ref/taxonomy/versions',
    });
  }

  async function getTop100(
    regionCode: string,
    year: string,
    month: string,
    day: string,
    rankedBy: EbirdRankedBy,
    maxResults: string
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      {
        name: 'y',
        value: year,
      },
      {
        name: 'm',
        value: month,
      },
      {
        name: 'd',
        value: day,
      },
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

    return await baseRequest<EbirdContributor[]>({
      endpoint: 'product/top100/{{regionCode}}/{{y}}/{{m}}/{{d}}',
      urlParams,
      queryParams,
    });
  }

  return {
    getAdjacentRegions,
    getChecklistFeedOnDate,
    getHotspotInfo,
    getNearbyHotspots,
    getRecentChecklists,
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
