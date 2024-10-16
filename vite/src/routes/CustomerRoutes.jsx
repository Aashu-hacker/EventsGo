import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

// login option 3 routing
const CustomerList = Loadable(lazy(() => import('views/customer/customer_list')));
const AddCustomer = Loadable(lazy(() => import('views/customer/add_customer')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const CustomerRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/customer-list',
      element: <CustomerList />
    },
    {
      path: '/add-customer',
      element: <AddCustomer />
    },
  ]
};

export default CustomerRoutes;
