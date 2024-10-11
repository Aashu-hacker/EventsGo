import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LandingRoutes from './LandingRoutes';
import LoginRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([LandingRoutes,MainRoutes, LoginRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
