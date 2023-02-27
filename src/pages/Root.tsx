import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import ApiKeyContext from '../context/ApiKeyContext';
import type ApiKeyContextInterface from '../types/ApiKeyContext';
import Header from '../components/Header';
import PageFormContext from '../context/PageFormContext';
import type PageFormContextInterface from '../types/PageFormContext';

export default function Root() {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyRequired, setApiKeyRequired] = useState(false);
  const [formId, setFormId] = useState('');

  const apiKeyContext: ApiKeyContextInterface = {
    apiKey,
    required: apiKeyRequired,
    setApiKey,
    setRequired: setApiKeyRequired,
  };

  const pageFormContext: PageFormContextInterface = {
    formId,
    setFormId,
  };

  return (
    <ApiKeyContext.Provider value={apiKeyContext}>
      <PageFormContext.Provider value={pageFormContext}>
        <Header></Header>
        <main>
          <Outlet />
        </main>
      </PageFormContext.Provider>
    </ApiKeyContext.Provider>
  );
}
