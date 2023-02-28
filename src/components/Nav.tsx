import NavMenu from './NavMenu';
import type NavMenuItem from '../types/NavMenuItem';

export default function Nav() {
  const hotspotMenuItmes: NavMenuItem[] = [
    {
      label: 'Nearby Hotspots',
      path: 'nearby-hotspots',
    },
    {
      label: 'Hotspots in a Region',
      path: 'region-hotspots',
    },
    {
      label: 'Hotspot Info',
      path: 'hotspot-info',
    },
  ];

  const taxonomyMenuItems: NavMenuItem[] = [
    {
      label: 'Taxa Locale Codes',
      path: 'taxa-locale-codes',
    },
    {
      label: 'Taxonomy Versions',
      path: 'taxonomy-versions',
    },
  ];

  return (
    <nav className="nav">
      <NavMenu
        items={hotspotMenuItmes}
        label="Hotspots"
      />
      <NavMenu
        items={taxonomyMenuItems}
        label="Taxonomy"
        menuAlignment="right"
      />
    </nav>
  );
}
