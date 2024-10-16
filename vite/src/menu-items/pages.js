// assets
import { IconUser } from '@tabler/icons-react';

// constant
const icons = {
  IconUser
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

// Get the login type from localStorage
const loginType = localStorage.getItem('loginType');

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    ...(loginType !== 'vendor'
      ? []
      : [
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
              url: '/customer-list',
              // target: true
            },
            {
              id: 'add-customer',
              title: 'Add Customer',
              type: 'item',
              url: '/add-customer',
              // target: true
            },
          ]
        }
      ])
  ]
};

export default pages;
