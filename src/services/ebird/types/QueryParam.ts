import type EbirdTaxonomyCategory from '../../../types/EbirdTaxonomyCategory';
import type EbirdObservationDetailLevel from '../../../types/EbirdObservationDetailLevel';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import type EbirdGroupNameLocale from '../../../types/EbirdGroupNameLocale';
import type EbirdHistoricalObservationRank from '../../../types/EbirdHistoricalObservationRank';
import type EbirdRegionNameFormat from '../../../types/EbirdRegionNameFormat';
import type EbirdContributorRankedBy from '../../../types/EbirdContributorRankedBy';
import type EbirdRecentNearbyObservationsSortBy from '../../../types/EbirdRecentNearbyObservationsSortBy';
import type EbirdChecklistSortBy from '../../../types/EbirdChecklistSortBy';
import type QueryParamValue from './QueryParamValue';

type BooleanQueryParamName = 'hotspot' | 'includeProvisional';

type StringArrayQueryParamName = 'r';

type StringQueryParamName =
  | 'back'
  | 'delim'
  | 'dist'
  | 'lat'
  | 'lng'
  | 'locale'
  | 'maxResults'
  | 'species'
  | 'sppLocale'
  | 'version';

type TypedQueryParamName =
  | 'cat'
  | 'detail'
  | 'fmt'
  | 'groupNameLocale'
  | 'rank'
  | 'rankedBy'
  | 'regionNameFormat'
  | 'sort'
  | 'sortKey';

type QueryParamName =
  | BooleanQueryParamName
  | StringArrayQueryParamName
  | StringQueryParamName
  | TypedQueryParamName;

interface BaseQueryParam<T extends QueryParamName, U extends QueryParamValue> {
  defaultValue?: U;
  name: T;
  value: U | undefined;
}

type QueryParam =
  | BaseQueryParam<BooleanQueryParamName, boolean>
  | BaseQueryParam<StringArrayQueryParamName, string[]>
  | BaseQueryParam<StringQueryParamName, string>
  | BaseQueryParam<'cat', EbirdTaxonomyCategory>
  | BaseQueryParam<'detail', EbirdObservationDetailLevel>
  | BaseQueryParam<'fmt', EbirdRecordFormat>
  | BaseQueryParam<'groupNameLocale', EbirdGroupNameLocale>
  | BaseQueryParam<'rank', EbirdHistoricalObservationRank>
  | BaseQueryParam<'rankedBy', EbirdContributorRankedBy>
  | BaseQueryParam<'regionNameFormat', EbirdRegionNameFormat>
  | BaseQueryParam<'sort', EbirdRecentNearbyObservationsSortBy>
  | BaseQueryParam<'sortKey', EbirdChecklistSortBy>;

export default QueryParam;
