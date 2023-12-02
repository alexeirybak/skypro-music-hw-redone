import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LogPage } from './pages/logPage';
import { RegPage } from './pages/regPage';
import { Main } from './pages/main';
import { Favourites } from './pages/favourites';
import { Category } from './pages/category';
import { NotFound } from './pages/not-found';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useContext} from 'react';
import { UserContext } from './contexts/UserContext';

export const AppRoutes = ({
  onAuthButtonClick,
  isLoading,
  setIsLoading,
  setIsBar,
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
              setIsBar={setIsBar}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          }
        />
        <Route
          path='/favourites'
          element={
            <Favourites
              setIsBar={setIsBar}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          }
        />
        <Route path='/category/:id' element={<Category />} />
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
