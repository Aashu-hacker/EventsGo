// assets
import { IconUser, IconBox } from '@tabler/icons-react';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';

// constant
const icons = {
  IconUser,
  IconBox
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

// Get the login type from localStorage
const loginType = localStorage.getItem('loginType');

const pages = {
  id: 'pages',
  // title: 'Pages',
  // caption: 'Pages Caption',
  type: 'group',
  children: [
    ...(loginType === 'vendor'
      ? [
          {
            id: 'customer',
            title: 'Customers',
            type: 'collapse',
            icon: icons.IconUser,
            children: [
              {
                id: 'customer-list',
                title: 'List',
                type: 'item',
                url: '/customer-list'
                // target: true
              },
              {
                id: 'add-customer',
                title: 'Add Customer',
                type: 'item',
                url: '/add-customer'
                // target: true
              }
            ]
          },
          {
            id: 'vendor',
            title: 'Vendor',
            type: 'collapse',
            icon: icons.IconBox,
            children: [
              {
                id: 'vendor-profile',
                title: 'Profile',
                type: 'item',
                url: '/vendor-profile',
              },
              {
                id: 'vendor-portfolio',
                title: 'Portfolio',
                type: 'item',
                url: '/Portfolio',
              }
            ]
          }
        ]
      : [])
  ]
};

export default pages;
