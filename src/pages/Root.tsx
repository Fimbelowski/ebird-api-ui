import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import { type SelectOptionArray } from '../components/Select/Select';
import TaxonomyVersionOptionsContext from '../context/TaxonomyVersionOptionsContext';
import Layout from '../layout/Layout/Layout';
import ScrollToTop from '../components/ScrollToTop';

export default function Root() {
  const [taxonomyVersionOptions, setTaxonomyVersionOptions] = useState<
    SelectOptionArray<string>
  >([{ label: 'Latest', value: '' }]);

  return (
    <>
      <Layout>
        <ScrollToTop />
        <TaxonomyVersionOptionsContext.Provider
          value={{ taxonomyVersionOptions, setTaxonomyVersionOptions }}
        >
          <Outlet />
        </TaxonomyVersionOptionsContext.Provider>
      </Layout>
    </>
  );
}
