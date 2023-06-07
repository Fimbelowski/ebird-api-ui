import useEbirdApi from '../../useEbirdApi';
import { type UrlParam } from '../../../ebirdApiClient';

export default async function useViewChecklist(subId: string) {
  const urlParams: UrlParam[] = [
    {
      name: 'subId',
      value: subId,
    },
  ];

  return await useEbirdApi('product/checklist/view/{{subId}}', { urlParams });
}
