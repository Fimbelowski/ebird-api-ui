import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import LocaleOptionsContext from '../context/LocaleOptionsContext';
import { type SelectOptionArray } from '../components/Select/Select';
import TaxonomyVersionOptionsContext from '../context/TaxonomyVersionOptionsContext';
import Layout from '../layout/Layout/Layout';
import ScrollToTop from '../components/ScrollToTop';

export default function Root() {
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
        <LocaleOptionsContext.Provider
          value={{ localeOptions, setLocaleOptions }}
        >
          <TaxonomyVersionOptionsContext.Provider
            value={{ taxonomyVersionOptions, setTaxonomyVersionOptions }}
          >
            <Outlet />
          </TaxonomyVersionOptionsContext.Provider>
        </LocaleOptionsContext.Provider>
      </Layout>
    </>
  );
}
