import { Link } from 'react-router-dom';

export interface PageLinkProps {
  description: string;
  path: string;
  title: string;
}

export function PageLink({ description, path, title }: PageLinkProps) {
  return (
    <Link
      className="page-link"
      to={path}
    >
      <h3 className="page-link__title">{title}</h3>
      <p>{description}</p>
    </Link>
  );
}
