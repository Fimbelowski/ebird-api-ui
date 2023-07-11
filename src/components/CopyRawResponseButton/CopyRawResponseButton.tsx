import { useState } from 'react';

import { Button, type ButtonProps } from '../Button/Button';
import classNames from '../../utilities/classNames';

type Props = Required<Pick<ButtonProps, 'onClick'>>;

export default function CopyRawResponseButton({ onClick: onClickProp }: Props) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  function confirmationClasses() {
    return classNames([
      'copy-raw-response-button__confirmation',
      { 'copy-raw-response-button__confirmation--active': showConfirmation },
    ]);
  }

  function onClick() {
    onClickProp();
    setShowConfirmation(true);

    setTimeout(() => {
      setShowConfirmation(false);
    }, 2100);
  }

  return (
    <div className="copy-raw-response-button">
      <Button
        fullWidth
        onClick={onClick}
        type="button"
      >
        Copy Raw Response to Clipboard
      </Button>
      <div className={confirmationClasses()}>Copied!</div>
    </div>
  );
}
