const BASE_PATH = '/';

const FOLDER_PATH = {
  Geography: `${BASE_PATH}geography`,
  Hotspots: `${BASE_PATH}hotspots`,
  Observations: `${BASE_PATH}observations`,
  Product: `${BASE_PATH}product`,
  Regions: `${BASE_PATH}regions`,
  Taxonomy: `${BASE_PATH}taxonomy`,
} as const;

const PATH = {
  AdjacentRegions: `${FOLDER_PATH.Geography}/adjacent-regions`,
  ChecklistFeedOnADate: `${FOLDER_PATH.Product}/checklist-feed-on-a-date`,
  EbirdTaxonomy: `${FOLDER_PATH.Taxonomy}/ebird-taxonomy`,
  Geography: FOLDER_PATH.Geography,
  HistoricObservationsOnADate: `${FOLDER_PATH.Observations}/historic-observations-on-a-date`,
  HotspotInfo: `${FOLDER_PATH.Hotspots}/hotspot-info`,
  Hotspots: FOLDER_PATH.Hotspots,
  HotspotsInARegion: `${FOLDER_PATH.Hotspots}/hotspots-in-a-region`,
  NearbyHotspots: `${FOLDER_PATH.Hotspots}/nearby-hotspots`,
  NearestObservationsOfASpecies: `${FOLDER_PATH.Observations}/nearest-observations-of-a-species`,
  Observations: FOLDER_PATH.Observations,
  Product: FOLDER_PATH.Product,
  RecentChecklistsFeed: `${FOLDER_PATH.Observations}/recent-checklists-feed`,
  RecentNearbyNotableObservations: `${FOLDER_PATH.Observations}/recent-nearby-notable-observations`,
  RecentNearbyObservations: `${FOLDER_PATH.Observations}/recent-nearby-observations`,
  RecentNearbyObservationsOfASPecies: `${FOLDER_PATH.Observations}/recent-nearby-observations-of-a-species`,
  RecentNotableObservationsInARegion: `${FOLDER_PATH.Observations}/recent-notable-observations-in-a-region`,
  RecentObservationsInARegion: `${FOLDER_PATH.Observations}/recent-observations-in-a-region`,
  RecentObservationsOfASpeciesInARegion: `${FOLDER_PATH.Observations}/recent-observations-of-a-species-in-a-region`,
  RegionalStatisticsOnADate: `${FOLDER_PATH.Product}/regional-statistics-on-a-date`,
  RegionInfo: `${FOLDER_PATH.Regions}/region-info`,
  Regions: FOLDER_PATH.Regions,
  Root: BASE_PATH,
  SpeciesListForARegion: `${FOLDER_PATH.Product}/species-list-for-a-region`,
  SubregionList: `${FOLDER_PATH.Regions}/sub-region-list`,
  TaxaLocaleCodes: `${FOLDER_PATH.Taxonomy}/taxa-locale-codes`,
  TaxonomicForms: `${FOLDER_PATH.Taxonomy}/taxonomic-forms`,
  TaxonomicGroups: `${FOLDER_PATH.Taxonomy}/taxonomic-groups`,
  Taxonomy: FOLDER_PATH.Taxonomy,
  TaxonomyVersions: `${FOLDER_PATH.Taxonomy}/taxonomy-versions`,
  Top100: `${FOLDER_PATH.Product}/top-100`,
  ViewChecklist: `${FOLDER_PATH.Product}/view-checklist`,
} as const;

export default PATH;
