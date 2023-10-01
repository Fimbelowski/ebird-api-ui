import { Outlet } from 'react-router-dom';

import Layout from '../layout/Layout/Layout';
import ScrollToTop from '../components/ScrollToTop';

export default function Root() {
  return (
    <>
      <Layout>
        <ScrollToTop />
        <Outlet />
      </Layout>
    </>
  );
}
