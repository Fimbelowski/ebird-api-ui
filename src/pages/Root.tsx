import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import ApiKeyContext from '../context/ApiKeyContext';
import Header from '../layout/Header/Header';
import LoadingContext from '../context/LoadingContext';
import LocaleOptionsContext from '../context/LocaleOptionsContext';
import { type SelectOptionArray } from '../components/Select/Select';

export default function Root() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [localeOptions, setLocaleOptions] = useState<SelectOptionArray<string>>(
    [
      {
        label: 'English',
        value: 'en',
      },
    ]
  );

  return (
    <>
      <Header></Header>
      <main className="main">
        <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
          <LoadingContext.Provider value={{ loading, setLoading }}>
            <LocaleOptionsContext.Provider
              value={{ localeOptions, setLocaleOptions }}
            >
              <Outlet />
            </LocaleOptionsContext.Provider>
          </LoadingContext.Provider>
        </ApiKeyContext.Provider>
      </main>
    </>
  );
}
