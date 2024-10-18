import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LandingRoutes from './LandingRoutes';
import LoginRoutes from './AuthenticationRoutes';
import customerRoutes from './CustomerRoutes';
import VendorRoutes from './VendorRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([LandingRoutes,MainRoutes, LoginRoutes, customerRoutes,VendorRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
