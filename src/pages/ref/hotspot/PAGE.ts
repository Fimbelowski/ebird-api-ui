import PATHS from '../../../types/PATHS';

const PAGE = {
  HotspotInfo: {
    description: 'Fetches information about a specified hotspot.',
    path: PATHS.HotspotInfo,
    requiresApiKey: true,
    title: 'Hotspot Info',
  },
  HotspotsInARegion: {
    description: 'Fetches hotspots within a specified country or region.',
    path: PATHS.HotspotsInARegion,
    requiresApiKey: true,
    title: 'Hotspots in a Region',
  },
  NearbyHotspots: {
    description: 'Fetches a list of hotspots near a given location.',
    path: PATHS.NearbyHotspots,
    requiresApiKey: true,
    title: 'Nearby Hotspots',
  },
} as const;

export default PAGE;
