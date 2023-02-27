import { type ChangeEvent, useContext, useState } from 'react';

import ApiKeyContext from '../context/ApiKeyContext';
import BaseInput from './BaseInput';
import Button from './Button';
import getValueFromChangeEvent from '../utilities/getValueFromChangeEvent';

export default function ApiKeyInput() {
  const { apiKey, required, setApiKey } = useContext(ApiKeyContext);

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
        required={required}
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
