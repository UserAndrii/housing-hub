import { createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AdvertisementPage from './pages/AdvertisementPage';

export const router = createBrowserRouter([
  {
    path: 'housing-hub/',
    element: <HomePage />,
  },
  {
    path: 'housing-hub/advertisement',
    element: <AdvertisementPage />,
  },
]);
