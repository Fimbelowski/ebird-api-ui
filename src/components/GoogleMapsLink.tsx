import type EbirdHotspot from '../types/EbirdHotspot';
import type EbirdLocation from '../types/EbirdLocation';
import NewTabLink from './NewTabLink';

interface Props {
  location: EbirdHotspot | EbirdLocation;
}

export default function GoogleMapsLink({ location }: Props) {
  const { lat, lng } = location;

  return (
    <NewTabLink href={`https://maps.google.com/?q=${lat},${lng}`}>
      Link
    </NewTabLink>
  );
}
