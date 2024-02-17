import 'normalize.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
