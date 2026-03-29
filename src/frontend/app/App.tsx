import { MainPage } from '@/pages/main';
import { RecipePage } from '@/pages/recipe';
import { HashRouter, Route, Routes } from 'react-router';
import { LayoutIndex } from './layouts/index';
import { ROUTES_PATHS } from '@/shared/config/routes';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES_PATHS.MAIN} element={<LayoutIndex />}>
          <Route index element={<MainPage />} />

          <Route path={ROUTES_PATHS.RECIPES} element={<RecipePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
