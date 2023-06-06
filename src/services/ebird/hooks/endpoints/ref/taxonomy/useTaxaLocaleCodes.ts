import useEbirdApi from '../../../useEbirdApi';

export default async function useTaxaLocaleCodes() {
  return await useEbirdApi('ref/taxa-locales/ebird');
}
