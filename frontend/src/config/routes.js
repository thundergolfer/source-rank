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
  {
    path: '/article',
    exact: true,
    component: Pages.Article,
  },
];

export default routes;
