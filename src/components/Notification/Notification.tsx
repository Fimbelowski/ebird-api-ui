import type { ReactNode } from 'react';

import classNames from '../../utilities/classNames';

type NotificationType = 'info';

interface Props {
  children?: ReactNode;
  type: NotificationType;
}

export default function Notification({ children, type }: Props) {
  function containerClasses() {
    return classNames([
      'notification',
      { 'notification--info': type === 'info' },
    ]);
  }

  return (
    <figure className={containerClasses()}>
      <div className="notification__content">{children}</div>
    </figure>
  );
}
