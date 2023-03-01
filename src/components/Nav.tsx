import NavMenu from './NavMenu';
import type NavMenuItem from '../types/NavMenuItem';

export default function Nav() {
  const hotspotMenuItems: NavMenuItem[] = [
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

  const regionMenuItems: NavMenuItem[] = [
    {
      label: 'Adjacent Regions',
      path: 'adjacent-regions',
    },
  ];

  const taxonomyMenuItems: NavMenuItem[] = [
    {
      label: 'Taxa Locale Codes',
      path: 'taxa-locale-codes',
    },
    {
      label: 'Taxonomic Groups',
      path: 'taxonomic-groups',
    },
    {
      label: 'Taxonomy Versions',
      path: 'taxonomy-versions',
    },
  ];

  return (
    <nav className="nav">
      <NavMenu
        items={hotspotMenuItems}
        label="Hotspots"
      />
      <NavMenu
        items={regionMenuItems}
        label="Regions"
      />
      <NavMenu
        items={taxonomyMenuItems}
        label="Taxonomy"
        menuAlignment="right"
      />
    </nav>
  );
}
