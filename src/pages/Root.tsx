import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import ApiKeyContext from '../context/ApiKeyContext';
import Header from '../components/Header';

export default function Root() {
  const [apiKey, setApiKey] = useState('');

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      <Header></Header>
      <main>
        <Outlet />
      </main>
    </ApiKeyContext.Provider>
  );
}
