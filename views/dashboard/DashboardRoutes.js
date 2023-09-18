import Loadable from 'components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';
// import DailyReport from 'views/daily_report/DailyReport';

const Analytics = Loadable(lazy(() => import('./Analytics')));
const DailyReport = Loadable(lazy(() => import('views/daily_report/DailyReport')));

const dashboardRoutes = [{ path: '/', element: <DailyReport />, auth: authRoles.admin }];

export default dashboardRoutes;
