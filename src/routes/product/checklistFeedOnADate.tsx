import ChecklistFeedOnADate from '../../pages/product/ChecklistFeedOnADate';
import type ExtendedRouteObject from '../ExtendedRouteObject';

const checklistFeedOnADate: ExtendedRouteObject = {
  element: <ChecklistFeedOnADate />,
  path: 'checklist-feed-on-a-date',
  meta: {
    name: 'Checklist Feed on a Date',
    requiresApiKey: true,
  },
};

export default checklistFeedOnADate;
