import { Link } from 'react-router-dom';

import type PageLinkInterface from '../../types/PageLink';
import Tooltip from '../Tooltip/Tooltip';

export default function PageLink({
  description,
  index = false,
  path,
  title,
  requiresApiKey = false,
}: PageLinkInterface) {
  function Icon() {
    if (index) {
      return <span>📂</span>;
    }

    const icon = requiresApiKey ? '🔑' : '🔓';

    const tooltipMessage = `This endpoint ${
      requiresApiKey ? 'requires' : 'does not require'
    } an API key.`;

    return <Tooltip text={tooltipMessage}>{icon}</Tooltip>;
  }

  return (
    <Link
      className="page-link"
      to={path}
    >
      <h3 className="page-link__title">
        <Icon /> {title}
      </h3>
      <p>{description}</p>
    </Link>
  );
}
