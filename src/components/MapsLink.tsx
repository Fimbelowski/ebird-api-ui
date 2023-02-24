import type EbirdHotspot from '../types/EbirdHotspot';
import type EbirdLocation from '../types/EbirdLocation';

interface Props {
  location: EbirdHotspot | EbirdLocation;
}

export default function MapsLink({ location }: Props) {
  const { lat, lng } = location;

  return (
    <a
      href={`https://maps.google.com/?q=${lat},${lng}`}
      rel="noreferrer"
      target="_blank"
    >
      Link
    </a>
  );
}
