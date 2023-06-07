export interface UrlParam {
  name: string;
  value: string | number;
}

export type QueryParamValue = boolean | number | string | string[];

export interface BaseQueryParam<T extends QueryParamValue> {
  defaultValue?: T;
  name: string;
  value: T | undefined;
}

export type QueryParam =
  | BaseQueryParam<boolean>
  | BaseQueryParam<number>
  | BaseQueryParam<string>
  | BaseQueryParam<string[]>;
