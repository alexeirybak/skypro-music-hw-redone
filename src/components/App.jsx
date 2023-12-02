import { useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { AppRoutes } from '../routes';
import { Player } from './Player';
import { setTheme } from '../utils/theme';
import { GlobalStyle } from '../styles/global';

setTheme();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')),
  );
  const [isBar, setIsBar] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <AppRoutes
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setIsBar={setIsBar}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        {isBar && (
          <Player
            isLoading={isLoading}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}
      </UserContext.Provider>
    </>
  );
};

export default App;
