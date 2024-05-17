import Admin from './pages/Admin.js';
import Auth from './pages/Auth.js';
import Basket from './pages/Basket.js';
import DevicePage from './pages/DevicePage.js';
import Shop from './pages/Shop.js';
import Settings from './pages/Settings.js'
import Profile from './pages/Profile.js'

import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, SETTINGS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, PROFILE_ROUTE, ABOUT_ROUTE } from './utils/consts.js';
import About from './pages/About.js';

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
    path: ABOUT_ROUTE,
    element: <About />,
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