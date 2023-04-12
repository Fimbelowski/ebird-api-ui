import { type ReactNode } from 'react';

import NewTabLink from './NewTabLink';

interface Props {
  children?: ReactNode;
  latitude: number;
  longitude: number;
}

export default function GoogleMapsLink({
  children,
  latitude,
  longitude,
}: Props) {
  return (
    <NewTabLink href={`https://maps.google.com/?q=${latitude},${longitude}`}>
      {children}
    </NewTabLink>
  );
}
