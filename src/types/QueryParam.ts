import type QueryParamValue from './QueryParamValue';

export default interface QueryParam {
  defaultValue?: NonNullable<QueryParamValue>;
  name: string;
  value: QueryParamValue;
}
