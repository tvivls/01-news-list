import { Route, Routes } from 'react-router-dom';
import { routes } from '../utils/routes';
const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Routes>
  );
};

export default AppRouter;
