import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="nav">
      <menu className="nav__menu">
        <li>
          <Link to="nearby-hotspots">Nearby Hotspots</Link>
        </li>
        <li>
          <Link to="region-hotspots">Hotspots in a Region</Link>
        </li>
        <li>
          <Link to="hotspot-info">Hotspot Info</Link>
        </li>
        <li>
          <Link to="taxonomy-versions">Taxonomy Versions</Link>
        </li>
      </menu>
    </nav>
  );
}
