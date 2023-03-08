import type EbirdContributor from '../types/EbirdContributor';

type Props = Pick<EbirdContributor, 'userDisplayName'> & {
  profileHandle: string;
};

export default function EbirdProfileLink({
  profileHandle,
  userDisplayName,
}: Props) {
  const baseUrl = 'https://ebird.org/profile/';

  return (
    <a
      href={`${baseUrl}${profileHandle}`}
      rel="noreferrer"
      target="_blank"
    >
      {userDisplayName}
    </a>
  );
}
