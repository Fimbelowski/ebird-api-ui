import type QueryParamValue from './QueryParamValue';

export default interface QueryParam {
  defaultValue?: QueryParamValue;
  name: string;
  value?: QueryParamValue;
}
