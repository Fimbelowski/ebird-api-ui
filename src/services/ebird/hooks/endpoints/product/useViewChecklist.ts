import useEbirdApi from '../../useEbirdApi';
import { type UrlParam } from '../../../types/EbirdApiParams';

export default function useViewChecklist() {
  const curriedMakeRequest = useEbirdApi();

  return async function getChecklist(subId: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'subId',
        value: subId,
      },
    ];

    return await curriedMakeRequest('product/checklist/view/{{subId}}', {
      urlParams,
    });
  };
}
