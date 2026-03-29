import { MainPage } from '@/pages/main';
import { RecipePage } from '@/pages/recipe';
import { HashRouter, Route, Routes } from 'react-router';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />

          <Route path="/recipe" element={<RecipePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
