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

const NotAuth = ({ children }) => {
    let {
        isAuthenticated,
        // user
    } = useAuth();
    const { pathname } = useLocation();

    //   const routes = flat(AllPages);

    //   const hasPermission = userHasPermission(pathname, user, routes);
    //   let authenticated = isAuthenticated && hasPermission;

    // // IF YOU NEED ROLE BASED AUTHENTICATION,
    // // UNCOMMENT ABOVE LINES
    // // AND COMMENT OUT BELOW authenticated VARIABLE

    let authenticated = isAuthenticated;
    console.log('vaoooo not auth', authenticated);

    return (
        <>
            {authenticated ? (
                <Navigate to={ConfigRouter.home} />
            ) : (
                children
            )}
        </>
    );
};

export default NotAuth;
