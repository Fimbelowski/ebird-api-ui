import { createRoutesFromChildren, Route } from 'react-router-dom';

import AdjacentRegions from './pages/ref/geo/AdjacentRegions';
import BaseIndexPage from './components/BaseIndexPage/BaseIndexPage';
import ChecklistFeedOnADate from './pages/product/ChecklistFeedOnADate';
import EbirdTaxonomy from './pages/ref/taxonomy/EbirdTaxonomy';
import Error from './pages/Error';
import Feedback from './pages/Feedback';
import geographyPages from './pages/ref/geo/pages';
import HistoricObservationsOnADate from './pages/obs/HistoricObservationsOnADate';
import HotspotInfo from './pages/ref/hotspot/HotspotInfo';
import hotspotPages from './pages/ref/hotspot/pages';
import HotspotsInARegion from './pages/ref/hotspot/HotspotsInARegion';
import Index from './pages/Index';
import NearbyHotspots from './pages/ref/hotspot/NearbyHotspots';
import NearestObservationOfASpecies from './pages/obs/NearestObservationsOfASpecies';
import NotFound from './pages/NotFound';
import observationsPages from './pages/obs/pages';
import PATHS from './types/PATHS';
import productPages from './pages/product/pages';
import RecentChecklistsFeed from './pages/obs/RecentChecklistsFeed';
import RecentNearbyNotableObservations from './pages/obs/RecentNearbyNotableObservations';
import RecentNearbyObservations from './pages/obs/RecentNearbyObservations';
import RecentNearbyObservationsOfASpecies from './pages/obs/RecentNearbyObservationsOfASpecies';
import RecentNotableObservationsInARegion from './pages/obs/RecentNotableObservationsInARegion';
import RecentObservationsInARegion from './pages/obs/RecentObservationsInARegion';
import RecentObservationsOfASpeciesInARegion from './pages/obs/RecentObservationsOfASpeciesInARegion';
import regionPages from './pages/ref/region/pages';
import RegionInfo from './pages/ref/region/RegionInfo';
import RegionalStatisticsOnADate from './pages/product/RegionalStatisticsOnADate';
import Root from './pages/Root';
import SpeciesListForARegion from './pages/product/SpeciesListForARegion';
import SubregionList from './pages/ref/region/SubregionList';
import TaxaLocaleCodes from './pages/ref/taxonomy/TaxaLocaleCodes';
import TaxonomicForms from './pages/ref/taxonomy/TaxonomicForms';
import TaxonomicGroups from './pages/ref/taxonomy/TaxonomicGroups';
import taxonomyPages from './pages/ref/taxonomy/pages';
import TaxonomyVersions from './pages/ref/taxonomy/TaxonomyVersions';
import Top100 from './pages/product/Top100';
import ViewChecklist from './pages/product/ViewChecklist';

export default createRoutesFromChildren(
  <Route
    path={PATHS.Root}
    element={<Root />}
  >
    <Route errorElement={<Error />}>
      <Route
        element={<Index />}
        index
      />
      <Route
        element={<Feedback />}
        path={PATHS.Feedback}
      />
      <Route path={PATHS.Geography}>
        <Route
          element={
            <BaseIndexPage
              description="Find a country's or region's neighbors."
              pages={geographyPages}
              title="Geography"
            />
          }
          index
        />
        <Route
          element={<AdjacentRegions />}
          path={PATHS.AdjacentRegions}
        />
      </Route>
      <Route path={PATHS.Hotspots}>
        <Route
          element={
            <BaseIndexPage
              description="Find the hotspots for a given country or region or nearby hotspots."
              pages={hotspotPages}
              title="Hotspots"
            />
          }
          index
        />
        <Route
          element={<HotspotInfo />}
          path={PATHS.HotspotInfo}
        />
        <Route
          element={<HotspotsInARegion />}
          path={PATHS.HotspotsInARegion}
        />
        <Route
          element={<NearbyHotspots />}
          path={PATHS.NearbyHotspots}
        />
      </Route>
      <Route path={PATHS.Observations}>
        <Route
          element={
            <BaseIndexPage
              description="Fetch observations submitted to eBird in checklists. Either for a specific country, region or location, or for nearby locations."
              pages={observationsPages}
              title="Observations"
            />
          }
          index
        />
        <Route
          element={<HistoricObservationsOnADate />}
          path={PATHS.HistoricObservationsOnADate}
        />
        <Route
          element={<NearestObservationOfASpecies />}
          path={PATHS.NearestObservationsOfASpecies}
        />
        <Route
          element={<RecentChecklistsFeed />}
          path={PATHS.RecentChecklistsFeed}
        />
        <Route
          element={<RecentNearbyNotableObservations />}
          path={PATHS.RecentNearbyNotableObservations}
        />
        <Route
          element={<RecentNearbyObservations />}
          path={PATHS.RecentNearbyObservations}
        />
        <Route
          element={<RecentNearbyObservationsOfASpecies />}
          path={PATHS.RecentNearbyObservationsOfASPecies}
        />
        <Route
          element={<RecentNotableObservationsInARegion />}
          path={PATHS.RecentNotableObservationsInARegion}
        />
        <Route
          element={<RecentObservationsInARegion />}
          path={PATHS.RecentObservationsInARegion}
        />
        <Route
          element={<RecentObservationsOfASpeciesInARegion />}
          path={PATHS.RecentObservationsOfASpeciesInARegion}
        />
      </Route>
      <Route path={PATHS.Product}>
        <Route
          element={
            <BaseIndexPage
              description="Product end-points make it easy to get the information shown in various pages on the eBird web site (Top 100 Contributors, checklist data, etc.)"
              pages={productPages}
              title="Product"
            />
          }
          index
        />
        <Route
          element={<ChecklistFeedOnADate />}
          path={PATHS.ChecklistFeedOnADate}
        />
        <Route
          element={<RegionalStatisticsOnADate />}
          path={PATHS.RegionalStatisticsOnADate}
        />
        <Route
          element={<SpeciesListForARegion />}
          path={PATHS.SpeciesListForARegion}
        />
        <Route
          element={<Top100 />}
          path={PATHS.Top100}
        />
        <Route
          element={<ViewChecklist />}
          path={PATHS.ViewChecklist}
        />
      </Route>
      <Route path={PATHS.Regions}>
        <Route
          element={
            <BaseIndexPage
              description="Get information about a specific region or get a list of all regions within a given region."
              pages={regionPages}
              title="Regions"
            />
          }
          index
        />
        <Route
          element={<RegionInfo />}
          path={PATHS.RegionInfo}
        />
        <Route
          element={<SubregionList />}
          path={PATHS.SubregionList}
        />
      </Route>
      <Route path={PATHS.Taxonomy}>
        <Route
          element={
            <BaseIndexPage
              description="Get taxonomic information about species as well as information about the taxonomy itself."
              pages={taxonomyPages}
              title="Taxonomy"
            />
          }
          index
        />
        <Route
          element={<EbirdTaxonomy />}
          path={PATHS.EbirdTaxonomy}
        />
        <Route
          element={<TaxaLocaleCodes />}
          path={PATHS.TaxaLocaleCodes}
        />
        <Route
          element={<TaxonomicForms />}
          path={PATHS.TaxonomicForms}
        />
        <Route
          element={<TaxonomicGroups />}
          path={PATHS.TaxonomicGroups}
        />
        <Route
          element={<TaxonomyVersions />}
          path={PATHS.TaxonomyVersions}
        />
      </Route>
      <Route
        element={<NotFound />}
        path={PATHS.NotFound}
      />
    </Route>
  </Route>
);
