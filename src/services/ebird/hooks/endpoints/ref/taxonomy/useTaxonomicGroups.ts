import useEbirdApi from '../../../useEbirdApi';
import type { BaseQueryParam } from '../../../../types/EbirdApiParams';
import type EbirdSpeciesGrouping from '../../../../../../types/EbirdSpeciesGrouping';
import type UrlParam from '../../../../types/UrlParam';

export type EbirdGroupNameLocale =
  | 'bg'
  | 'cs'
  | 'da'
  | 'de'
  | 'en'
  | 'es'
  | 'es_AR'
  | 'es_CL'
  | 'es_CU'
  | 'es_ES'
  | 'es_MX'
  | 'es_PA'
  | 'fr'
  | 'he'
  | 'is'
  | 'nl'
  | 'no'
  | 'pt_BR'
  | 'pt_PT'
  | 'ru'
  | 'sr'
  | 'th'
  | 'tr'
  | 'zh';

export function useTaxonomicGroups() {
  const curriedMakeRequest = useEbirdApi();

  return async function getTaxonomicGroups(
    speciesGrouping: EbirdSpeciesGrouping,
    groupNameLocale: EbirdGroupNameLocale = 'en'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'speciesGrouping',
        value: speciesGrouping,
      },
    ];

    const groupNameLocaleQueryParam: BaseQueryParam<EbirdGroupNameLocale> = {
      defaultValue: 'en',
      name: 'groupNameLocale',
      value: groupNameLocale,
    };

    return await curriedMakeRequest('ref/sppgroup/{{speciesGrouping}}', {
      urlParams,
      queryParams: [groupNameLocaleQueryParam],
    });
  };
}
