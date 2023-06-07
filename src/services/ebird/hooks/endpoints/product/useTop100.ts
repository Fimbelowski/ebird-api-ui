import useEbirdApi from '../../useEbirdApi';
import {
  type UrlParam,
  type QueryParam,
  type BaseQueryParam,
} from '../../../ebirdApiClient';

type RankedBy = 'cl' | 'spp';

export default async function useTop100(
  regionCode: string,
  year: number,
  month: number,
  day: number,
  rankedBy: RankedBy = 'spp',
  maxResults?: number
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

  const rankedByQueryParam: BaseQueryParam<RankedBy> = {
    defaultValue: 'spp',
    name: 'rankedBy',
    value: rankedBy,
  };

  const queryParams: QueryParam[] = [
    rankedByQueryParam,
    {
      name: 'maxResults',
      value: maxResults,
    },
  ];

  return await useEbirdApi('product/top100/{{regionCode}}/{{y}}/{{m}}/{{d}}', {
    urlParams,
    queryParams,
  });
}
