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
