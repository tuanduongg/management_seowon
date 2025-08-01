import Loadable from 'components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';
import { ConfigRouter } from 'ConfigRouter';
// import DailyReport from 'views/daily_report/DailyReport';

const DailyReport = Loadable(lazy(() => import('views/daily_report/DailyReport')));
const Model = Loadable(lazy(() => import('views/model')));
const Time = Loadable(lazy(() => import('views/time')));
const Department = Loadable(lazy(() => import('views/department')));
const Stage = Loadable(lazy(() => import('views/stage')));
const Account = Loadable(lazy(() => import('views/account')));
const Profile = Loadable(lazy(() => import('views/profile')));

const dashboardRoutes = [
    { path: ConfigRouter.home, element: <DailyReport />, auth: authRoles.admin },
    { path: ConfigRouter.model, element: <Model />, auth: authRoles.admin },
    { path: ConfigRouter.time, element: <Time />, auth: authRoles.admin },
    { path: ConfigRouter.department, element: <Department />, auth: authRoles.admin },
    { path: ConfigRouter.stage, element: <Stage />, auth: authRoles.admin },
    { path: ConfigRouter.user, element: <Account />, auth: authRoles.admin },
    { path: ConfigRouter.profile, element: <Profile />, auth: authRoles.admin },
];

export default dashboardRoutes;
