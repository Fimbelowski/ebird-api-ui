import NewTabLink from './NewTabLink';

interface Props {
  id: string;
  name: string;
}

export default function EbirdHotspotLink({ id, name }: Props) {
  return (
    <NewTabLink href={`https://ebird.org/hotspot/${id}`}>{name}</NewTabLink>
  );
}
