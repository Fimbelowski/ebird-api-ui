import type ExtendedRouteObject from '../ExtendedRouteObject';
import ViewChecklist from '../../pages/product/ViewChecklist';

const viewChecklist: ExtendedRouteObject = {
  element: <ViewChecklist />,
  path: 'view-checklist',
  meta: {
    name: 'View Checklist',
    requiresApiKey: true,
  },
};

export default viewChecklist;
