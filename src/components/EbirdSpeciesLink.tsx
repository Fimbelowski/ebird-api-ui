import NewTabLink from './NewTabLink';

interface Props {
  commonName: string;
  speciesCode: string;
}

export default function EbirdSpeciesLink({ commonName, speciesCode }: Props) {
  return (
    <NewTabLink href={`https://ebird.org/species/${speciesCode}`}>
      {commonName}
    </NewTabLink>
  );
}
