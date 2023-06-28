import useEbirdApi from '../../../useEbirdApi';
import type EbirdTaxonomyCategory from '../../../../../../types/EbirdTaxonomyCategory';
import type {
  QueryParam,
  BaseQueryParam,
} from '../../../../types/EbirdApiParams';
import type UrlParam from '../../../../types/UrlParam';

export default function useRecentObservationsInARegion() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRecentObservationsInARegion(
    regionCode: string,
    back = '14',
    category?: EbirdTaxonomyCategory,
    hotspot = false,
    includeProvisional = false,
    maxResults?: string,
    locations?: string[],
    speciesCommonNameLocale = 'en'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    const categoryQueryParam: BaseQueryParam<EbirdTaxonomyCategory> = {
      name: 'cat',
      value: category,
    };

    const queryParams: QueryParam[] = [
      {
        defaultValue: '14',
        name: 'back',
        value: back,
      },
      categoryQueryParam,
      {
        defaultValue: false,
        name: 'hotspot',
        value: hotspot,
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
        value: locations,
      },
      {
        defaultValue: 'en',
        name: 'sppLocale',
        value: speciesCommonNameLocale,
      },
    ];

    return await curriedMakeRequest('data/obs/{{regionCode}}/recent', {
      urlParams,
      queryParams,
    });
  };
}
