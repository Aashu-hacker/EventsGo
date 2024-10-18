import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

// login option 3 routing
const VendorProfile = Loadable(lazy(() => import('views/vendor/Profile')));
// const AddCustomer = Loadable(lazy(() => import('views/customer/add_customer')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const CustomerRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/vendor-profile',
      element: <VendorProfile />
    },
    // {
    //   path: '/add-customer',
    //   element: <AddCustomer />
    // },
  ]
};

export default CustomerRoutes;
