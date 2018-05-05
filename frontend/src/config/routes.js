import * as Pages from '../views/pages';

const routes = [
  {
    path: '/',
    exact: true,
    component: Pages.Home,
  },
  {
    path: '/about',
    exact: true,
    component: Pages.About,
  },
];

export default routes;
