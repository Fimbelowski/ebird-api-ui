import { Link } from 'react-router-dom';

import type PageLinkInterface from '../../types/Page';
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
      return <>📂</>;
    }

    return <Tooltip text="This endpoint requires an API key.">🔑</Tooltip>;
  }

  function showIcon() {
    return index || requiresApiKey;
  }

  return (
    <Link
      className="page-link"
      to={path}
    >
      <h3 className="page-link__title">
        {showIcon() ? (
          <>
            <Icon />{' '}
          </>
        ) : null}
        {title}
      </h3>
      <p>{description}</p>
    </Link>
  );
}
