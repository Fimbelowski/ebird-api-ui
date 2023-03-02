import { useState } from 'react';

import BaseInput from './BaseInput';
import Button from './Button';
import useApiKey from '../hooks/useApiKey';

export default function ApiKeyInput() {
  const { apiKey, setApiKey } = useApiKey();

  const [showApiKey, setShowApiKey] = useState(false);

  function inputType() {
    return showApiKey ? 'text' : 'password';
  }

  function onChange(value: string) {
    setApiKey(value);
  }

  function onToggleShowApiKey() {
    setShowApiKey(!showApiKey);
  }

  function buttonLabel() {
    return showApiKey ? 'Hide' : 'Show';
  }

  return (
    <div className="api-key-input">
      <div className="api-key-input__input">
        <BaseInput
          id="api-key"
          label="API Key"
          onChange={onChange}
          required
          type={inputType()}
          value={apiKey}
        />
      </div>
      <Button
        onClick={onToggleShowApiKey}
        type="button"
      >
        {buttonLabel()}
      </Button>
    </div>
  );
}
