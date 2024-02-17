import { createBrowserRouter } from 'react-router-dom';
import AdvertisementPage from './pages/AdvertisementPage';

export const router = createBrowserRouter([
  {
    path: 'housing-hub/',
    element: <AdvertisementPage />,
  },
  {
    path: 'housing-hub/advertisement',
    element: <AdvertisementPage />,
  },
]);
