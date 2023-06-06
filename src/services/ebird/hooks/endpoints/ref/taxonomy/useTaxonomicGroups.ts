import useEbirdApi from '../../../useEbirdApi';
import { type UrlParam, type BaseQueryParam } from '../../../../ebirdApiClient';

export type SpeciesGrouping = 'ebird' | 'merlin';
export type GroupNameLocale =
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

export async function useTaxonomicGroups(
  speciesGrouping: SpeciesGrouping,
  groupNameLocale: GroupNameLocale = 'en'
) {
  const urlParams: UrlParam[] = [
    {
      name: 'speciesGrouping',
      value: speciesGrouping,
    },
  ];

  const groupNameLocaleQueryParam: BaseQueryParam<GroupNameLocale> = {
    defaultValue: 'en',
    name: 'groupNameLocale',
    value: groupNameLocale,
  };

  return await useEbirdApi('ref/sppgroup/{{speciesGrouping}}', {
    urlParams,
    queryParams: [groupNameLocaleQueryParam],
  });
}
