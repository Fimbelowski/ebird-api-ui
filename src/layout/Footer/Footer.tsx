import { Link } from 'react-router-dom';

import PATH from '../../types/PATH';

export default function Footer() {
  return (
    <footer className="footer">
      <Link to={PATH.Feedback}>Feedback</Link> -{' '}
      <a
        href="https://github.com/Fimbelowski/ebird-api-ui"
        rel="noopener noreferrer"
        target="_blank"
      >
        Source Code
      </a>
    </footer>
  );
}
