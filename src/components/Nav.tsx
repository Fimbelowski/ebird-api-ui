import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="nav">
      <menu className="nav__menu">
        <li>
          <Link to="/nearby-hotspots">Nearby Hotspots</Link>
        </li>
      </menu>
    </nav>
  );
}
