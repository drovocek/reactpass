import { Route } from '@vaadin/router';
import './views/list/list-view';

export type ViewRoute = Route & { title?: string; children?: ViewRoute[] };

export const views: ViewRoute[] = [
  // for client-side, place routes below (more info https://vaadin.com/docs/v19/flow/typescript/creating-routes.html)
  {
    path: '',
    component: 'list-view',
    title: 'list',
  },
];
export const routes: ViewRoute[] = [...views];
