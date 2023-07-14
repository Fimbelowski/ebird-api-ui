import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import ApiKeyContext from '../context/ApiKeyContext';
import LoadingContext from '../context/LoadingContext';
import LocaleOptionsContext from '../context/LocaleOptionsContext';
import { type SelectOptionArray } from '../components/Select/Select';
import TaxonomyVersionOptionsContext from '../context/TaxonomyVersionOptionsContext';
import Layout from '../layout/Layout/Layout';
import ScrollToTop from '../components/ScrollToTop';

export default function Root() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [localeOptions, setLocaleOptions] = useState<SelectOptionArray<string>>(
    [
      {
        label: 'English',
        value: 'en',
      },
    ]
  );
  const [taxonomyVersionOptions, setTaxonomyVersionOptions] = useState<
    SelectOptionArray<string>
  >([{ label: 'Latest', value: '' }]);

  return (
    <>
      <Layout>
        <ScrollToTop />
        <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
          <LoadingContext.Provider
            value={{ loading, loadingPosition, setLoading, setLoadingPosition }}
          >
            <LocaleOptionsContext.Provider
              value={{ localeOptions, setLocaleOptions }}
            >
              <TaxonomyVersionOptionsContext.Provider
                value={{ taxonomyVersionOptions, setTaxonomyVersionOptions }}
              >
                <Outlet />
              </TaxonomyVersionOptionsContext.Provider>
            </LocaleOptionsContext.Provider>
          </LoadingContext.Provider>
        </ApiKeyContext.Provider>
      </Layout>
    </>
  );
}
