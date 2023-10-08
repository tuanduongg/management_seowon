import AuthGuard from 'auth/AuthGuard';
import dashboardRoutes from 'views/dashboard/DashboardRoutes';
import NotFound from 'views/sessions/NotFound';
import sessionRoutes from 'views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import { ConfigRouter } from './ConfigRouter';
import NotAuth from 'auth/NotAuth';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes],
  },
  {
    // element: (
    //   <NotAuth />
    // ),
    children: [...sessionRoutes],
  },
  // ...sessionRoutes,
  // { path: ConfigRouter.home, element: <Navigate to={ConfigRouter.home} /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
