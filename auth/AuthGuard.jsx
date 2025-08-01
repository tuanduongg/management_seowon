import { ConfigRouter } from 'ConfigRouter';
import useAuth from 'hooks/useAuth';
// import { flat } from 'utils/utils';
import { Navigate, useLocation } from 'react-router-dom';
// import AllPages from '../routes';

// const userHasPermission = (pathname, user, routes) => {
//   if (!user) {
//     return false;
//   }
//   const matched = routes.find((r) => r.path === pathname);

//   const authenticated =
//     matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;
//   return authenticated;
// };

const AuthGuard = ({ children }) => {
  let {
    isAuthenticated,
    // user
  } = useAuth();
  const { pathname } = useLocation();

  // // IF YOU NEED ROLE BASED AUTHENTICATION,
  // // UNCOMMENT ABOVE LINES
  // // AND COMMENT OUT BELOW authenticated VARIABLE

  let authenticated = isAuthenticated;

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to={ConfigRouter.login} state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
