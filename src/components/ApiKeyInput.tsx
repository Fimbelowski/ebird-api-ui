import { type ChangeEvent, useState } from 'react';

import BaseInput from './BaseInput';
import Button from './Button';
import getValueFromChangeEvent from '../utilities/getValueFromChangeEvent';
import useApiKey from '../hooks/useApiKey';

export default function ApiKeyInput() {
  const { apiKey, setApiKey } = useApiKey();

  const [showApiKey, setShowApiKey] = useState(false);

  function inputType() {
    return showApiKey ? 'text' : 'password';
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getValueFromChangeEvent(event);
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
      <BaseInput
        id="api-key"
        inline
        label="Api Key"
        onChange={onChange}
        required
        type={inputType()}
        value={apiKey}
      />
      <Button
        onClick={onToggleShowApiKey}
        type="button"
      >
        {buttonLabel()}
      </Button>
    </div>
  );
}
