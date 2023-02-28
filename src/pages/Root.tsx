import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import ApiKeyContext from '../context/ApiKeyContext';
import Header from '../components/Header';

export default function Root() {
  const [apiKey, setApiKey] = useState('');

  return (
    <>
      <Header></Header>
      <main>
        <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
          <Outlet />
        </ApiKeyContext.Provider>
      </main>
    </>
  );
}
