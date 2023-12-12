import { Routes, Route } from 'react-router-dom';
import { LogPage } from './pages/logPage';
import { RegPage } from './pages/regPage';
import { Main } from './pages/main';
import { Favorites } from './pages/favorites';
import { Category } from './pages/category';
import { NotFound } from './pages/not-found';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

export const AppRoutes = ({
  onAuthButtonClick,
  isLoading,
  setIsLoading,
  setIsPlaying,
  isPlaying,
}) => {
  const { user } = useContext(UserContext);
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={user} />}>
        <Route
          path='/'
          element={
            <Main
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          }
        />
        <Route
          path='/favorites'
          element={
            <Favorites
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          }
        />
        <Route
          path='/category/:id'
          element={
            <Category
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          }
        />
      </Route>
      <Route path='/register' element={<RegPage />} />
      <Route
        path='/login'
        element={<LogPage onAuthButtonClick={onAuthButtonClick} />}
      />
      <Route path='*' element={<NotFound isLoading={isLoading} />} />
    </Routes>
  );
};
