import Loadable from 'components/Loadable';
import { lazy } from 'react';
import { ConfigRouter } from 'ConfigRouter';
const NotFound = Loadable(lazy(() => import('./NotFound')));
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('./JwtRegister')));

const sessionRoutes = [
  { path: ConfigRouter.signup, element: <JwtRegister /> },
  { path: ConfigRouter.login, element: <JwtLogin /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: ConfigRouter.notfound, element: <NotFound /> },
];

export default sessionRoutes;
