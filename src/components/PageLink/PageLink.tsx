import { Link } from 'react-router-dom';

import type PageLinkInterface from '../../types/PageLink';

export default function PageLink({
  description,
  path,
  title,
  requiresApiKey = false,
}: PageLinkInterface) {
  return (
    <Link
      className="page-link"
      to={path}
    >
      <h3 className="page-link__title">{`${title} ${
        requiresApiKey ? '🔑' : '🔓'
      }`}</h3>
      <p>{description}</p>
    </Link>
  );
}
