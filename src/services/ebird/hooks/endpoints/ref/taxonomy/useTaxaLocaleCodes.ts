import useEbirdApi from '../../../useEbirdApi';

export default function useTaxaLocaleCodes() {
  const curriedMakeRequest = useEbirdApi();

  return async function getTaxaLocaleCodes() {
    return await curriedMakeRequest('ref/taxa-locales/ebird');
  };
}
