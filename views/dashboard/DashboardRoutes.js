import Loadable from 'components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';
import { ConfigRouter } from 'ConfigRouter';
// import DailyReport from 'views/daily_report/DailyReport';

const DailyReport = Loadable(lazy(() => import('views/daily_report/DailyReport')));
const Model = Loadable(lazy(() => import('views/model')));
const Time = Loadable(lazy(() => import('views/time')));

const dashboardRoutes = [
    { path: ConfigRouter.home, element: <DailyReport />, auth: authRoles.admin },
    { path: ConfigRouter.model, element: <Model />, auth: authRoles.admin },
    { path: ConfigRouter.time, element: <Time />, auth: authRoles.admin },
];

export default dashboardRoutes;
