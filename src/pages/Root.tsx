import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import ApiKeyContext from '../context/ApiKeyContext';
import type ApiKeyContextInterface from '../types/ApiKeyContext';
import Header from '../components/Header';

export default function Root() {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyRequired, setApiKeyRequired] = useState(false);
  const [formId, setFormId] = useState('');

  const apiKeyContext: ApiKeyContextInterface = {
    apiKey,
    formId,
    required: apiKeyRequired,
    setApiKey,
    setFormId,
    setRequired: setApiKeyRequired,
  };

  return (
    <ApiKeyContext.Provider value={apiKeyContext}>
      <Header></Header>
      <main>
        <Outlet />
      </main>
    </ApiKeyContext.Provider>
  );
}
