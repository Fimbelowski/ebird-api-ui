import { createRoutesFromChildren, Route } from 'react-router-dom';

import AdjacentRegions from './pages/ref/geo/AdjacentRegions';
import ChecklistFeedOnADate from './pages/product/ChecklistFeedOnADate';
import EbirdTaxonomy from './pages/ref/taxonomy/EbirdTaxonomy';
import Geography from './pages/ref/geo/Geography';
import HistoricObservationsOnADate from './pages/obs/HistoricObservationsOnADate';
import HotspotInfo from './pages/ref/hotspot/HotspotInfo';
import HotspotsInARegion from './pages/ref/hotspot/HotspotsInARegion';
import NearbyHotspots from './pages/ref/hotspot/NearbyHotspots';
import NearestObservationOfASpecies from './pages/obs/NearestObservationsOfASpecies';
import RecentChecklistsFeed from './pages/obs/RecentChecklistsFeed';
import RecentNearbyNotableObservations from './pages/obs/RecentNearbyNotableObservations';
import RecentNearbyObservations from './pages/obs/RecentNearbyObservations';
import RecentNearbyObservationsOfASpecies from './pages/obs/RecentNearbyObservationsOfASpecies';
import RecentNotableObservationsInARegion from './pages/obs/RecentNotableObservationsInARegion';
import RecentObservationsInARegion from './pages/obs/RecentObservationsInARegion';
import RecentObservationsOfASpeciesInARegion from './pages/obs/RecentObservationsOfASpeciesInARegion';
import RegionInfo from './pages/ref/region/RegionInfo';
import RegionalStatisticsOnADate from './pages/product/RegionalStatisticsOnADate';
import Root from './pages/Root';
import SpeciesListForARegion from './pages/product/SpeciesListForARegion';
import SubregionList from './pages/ref/region/SubregionList';
import TaxaLocaleCodes from './pages/ref/taxonomy/TaxaLocaleCodes';
import TaxonomicForms from './pages/ref/taxonomy/TaxonomicForms';
import TaxonomicGroups from './pages/ref/taxonomy/TaxonomicGroups';
import TaxonomyVersions from './pages/ref/taxonomy/TaxonomyVersions';
import Top100 from './pages/product/Top100';
import ViewChecklist from './pages/product/ViewChecklist';

export default createRoutesFromChildren(
  <Route
    path="/"
    element={<Root />}
  >
    <Route path="geography">
      <Route
        element={<Geography />}
        index
      />
      <Route
        element={<AdjacentRegions />}
        path="adjacent-regions"
      />
    </Route>
    <Route path="hotspots">
      <Route
        element={<HotspotInfo />}
        path="hotspot-info"
      />
      <Route
        element={<HotspotsInARegion />}
        path="hotspots-in-a-region"
      />
      <Route
        element={<NearbyHotspots />}
        path="nearby-hotspots"
      />
    </Route>
    <Route path="observations">
      <Route
        element={<HistoricObservationsOnADate />}
        path="historic-observations-on-a-date"
      />
      <Route
        element={<NearestObservationOfASpecies />}
        path="nearest-observations-of-a-species"
      />
      <Route
        element={<RecentChecklistsFeed />}
        path="recent-checklists-feed"
      />
      <Route
        element={<RecentNearbyNotableObservations />}
        path="recent-nearby-notable-observations"
      />
      <Route
        element={<RecentNearbyObservations />}
        path="recent-nearby-observations"
      />
      <Route
        element={<RecentNearbyObservationsOfASpecies />}
        path="recent-nearby-observations-of-a-species"
      />
      <Route
        element={<RecentNotableObservationsInARegion />}
        path="recent-notable-observations-in-a-region"
      />
      <Route
        element={<RecentObservationsInARegion />}
        path="recent-observations-in-a-region"
      />
      <Route
        element={<RecentObservationsOfASpeciesInARegion />}
        path="recent-observations-of-a-species-in-a-region"
      />
    </Route>
    <Route path="product">
      <Route
        element={<ChecklistFeedOnADate />}
        path="checklist-feed-on-a-date"
      />
      <Route
        element={<RegionalStatisticsOnADate />}
        path="regional-statistics-on-a-date"
      />
      <Route
        element={<SpeciesListForARegion />}
        path="species-list-for-a-region"
      />
      <Route
        element={<Top100 />}
        path="top-100"
      />
      <Route
        element={<ViewChecklist />}
        path="view-checklist"
      />
    </Route>
    <Route path="regions">
      <Route
        element={<RegionInfo />}
        path="region-info"
      />
      <Route
        element={<SubregionList />}
        path="sub-region-list"
      />
    </Route>
    <Route path="taxonomy">
      <Route
        element={<EbirdTaxonomy />}
        path="ebird-taxonomy"
      />
      <Route
        element={<TaxaLocaleCodes />}
        path="taxa-locale-codes"
      />
      <Route
        element={<TaxonomicForms />}
        path="taxonomic-forms"
      />
      <Route
        element={<TaxonomicGroups />}
        path="taxonomic-groups"
      />
      <Route
        element={<TaxonomyVersions />}
        path="taxonomy-verions"
      />
    </Route>
  </Route>
);
