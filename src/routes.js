import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import DevicePage from './pages/DevicePage';
import Shop from './pages/Shop';
import Settings from './pages/Settings'
import Profile from './pages/Profile'

import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, SETTINGS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, PROFILE_ROUTE } from './utils/consts';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    element: <Admin />,
  },
  {
    path: BASKET_ROUTE,
    element: <Basket />,
  },
  {
    path: SETTINGS_ROUTE,
    element: <Settings />,
  },
  {
    path: PROFILE_ROUTE,
    element: <Profile />,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    element: <Shop />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Auth />,
  },
  {
    path: DEVICE_ROUTE + '/:id', // Dynamic route for device details
    element: <DevicePage />,
  },
];