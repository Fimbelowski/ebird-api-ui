import { useState } from 'react';

import { BaseInput } from '../BaseInput';
import { Button } from '../Button/Button';
import { update } from '../../store/slices/apiKeySlice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

export default function ApiKeyInput() {
  const apiKey = useAppSelector((state) => state.apiKey.value);
  const dispatch = useAppDispatch();

  const [showApiKey, setShowApiKey] = useState(false);

  function inputType() {
    return showApiKey ? 'text' : 'password';
  }

  function onChange(value: string) {
    dispatch(update(value));
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
