import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import ApiKeyContext from '../context/ApiKeyContext';
import Header from '../components/Header';
import LoadingContext from '../context/LoadingContext';

export default function Root() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header></Header>
      <main>
        <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
          <LoadingContext.Provider value={{ loading, setLoading }}>
            <Outlet />
          </LoadingContext.Provider>
        </ApiKeyContext.Provider>
      </main>
    </>
  );
}
