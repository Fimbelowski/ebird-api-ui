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

type UrlParam =
  | BaseUrlParam<StringUrlParamName, string>
  | BaseUrlParam<'regionType', EbirdRegionType>
  | BaseUrlParam<'speciesGrouping', EbirdSpeciesGrouping>;

export default UrlParam;
