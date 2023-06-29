import type EbirdGroupNameLocale from '../../../../../../types/EbirdGroupNameLocale';
import type EbirdSpeciesGrouping from '../../../../../../types/EbirdSpeciesGrouping';
import type QueryParam from '../../../../types/QueryParam';
import type UrlParam from '../../../../types/UrlParam';
import useEbirdApi from '../../../useEbirdApi';

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

    const queryParams: QueryParam[] = [
      {
        defaultValue: 'en',
        name: 'groupNameLocale',
        value: groupNameLocale,
      },
    ];

    return await curriedMakeRequest('ref/sppgroup/{{speciesGrouping}}', {
      urlParams,
      queryParams,
    });
  };
}
