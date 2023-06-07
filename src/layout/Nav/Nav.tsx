import { NavMenu, type Item } from '../../components/NavMenu/NavMenu';

export default function Nav() {
  const geographyMenuItems: Item[] = [
    {
      label: 'Adjacent Regions',
      path: 'adjacent-regions',
    },
    {
      label: 'Region Info',
      path: 'region-info',
    },
  ];

  const hotspotMenuItems: Item[] = [
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

  const observationMenuItems: Item[] = [
    {
      label: 'Recent Checklists',
      path: 'recent-checklists',
    },
    {
      label: 'Recent Notable Observations in a Region',
      path: 'recent-notable-observations-region',
    },
    {
      label: 'Recent Observations in a Region',
      path: 'recent-observations-region',
    },
    {
      label: 'Recent Observations of a Species in a Region',
      path: 'recent-observations-species-region',
    },
  ];

  const productMenuItems: Item[] = [
    {
      label: 'Checklist Feed on a Date',
      path: 'checklist-feed',
    },
    {
      label: 'Regional Statistics on a Date',
      path: 'region-stats',
    },
    {
      label: 'Species List for a Region',
      path: 'species-list-region',
    },
    {
      label: 'Top 100 Contributors',
      path: 'top-100',
    },
  ];

  const regionMenuItems: Item[] = [
    {
      label: 'Sub-region List',
      path: 'sub-region-list',
    },
  ];

  const taxonomyMenuItems: Item[] = [
    {
      label: 'Taxa Locale Codes',
      path: 'taxa-locale-codes',
    },
    {
      label: 'Taxonomic Forms',
      path: 'taxonomic-forms',
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
        items={geographyMenuItems}
        label="Geography"
      />
      <NavMenu
        items={hotspotMenuItems}
        label="Hotspots"
      />
      <NavMenu
        items={observationMenuItems}
        label="Observations"
      />
      <NavMenu
        items={productMenuItems}
        label="Product"
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
