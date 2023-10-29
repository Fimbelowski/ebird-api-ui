import type { ReactNode } from 'react';

import NewTabLink from './NewTabLink';

interface Props {
  children?: ReactNode;
  subId: string;
}

export default function EbirdChecklistLink({ children, subId }: Props) {
  return (
    <NewTabLink href={`https://ebird.org/checklist/${subId}`}>
      {children}
    </NewTabLink>
  );
}
