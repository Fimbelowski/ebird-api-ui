import type EbirdRegionType from '../../../types/EbirdRegionType';
import type EbirdSpeciesGrouping from '../../../types/EbirdSpeciesGrouping';

type StringUrlParamName =
  | 'd'
  | 'locId'
  | 'm'
  | 'parentRegionCode'
  | 'regionCode'
  | 'speciesCode'
  | 'subId'
  | 'y';

type TypedUrlParamName = 'regionType' | 'speciesGrouping';

type UrlParamName = StringUrlParamName | TypedUrlParamName;

interface BaseUrlParam<T extends UrlParamName, U extends string> {
  name: T;
  value: U;
}

export type UrlParam =
  | BaseUrlParam<StringUrlParamName, string>
  | BaseUrlParam<'regionType', EbirdRegionType>
  | BaseUrlParam<'speciesGrouping', EbirdSpeciesGrouping>;

export type QueryParamValue = boolean | string | string[];

export interface BaseQueryParam<T extends QueryParamValue> {
  defaultValue?: T;
  name: string;
  value: T | undefined;
}

export type QueryParam =
  | BaseQueryParam<boolean>
  | BaseQueryParam<string>
  | BaseQueryParam<string[]>;
