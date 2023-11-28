import { useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { AppRoutes } from '../routes';
import { Player } from './Player';
import { setTheme } from '../utils/theme';
import { getAllTracks } from '../api/apiGetTracks';
import { GlobalStyle } from '../styles/global';

setTheme();

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [music, setMusic] = useState([]);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isBar, setIsBar] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const tracks = await getAllTracks();
        setMusic(tracks);
        setIsLoading(true);
        setError(false);
      } catch (error) {
        setIsLoading(true);
        setError(error.message);
      }
    }
    fetchTracks();
  }, []);

  const handleLogin = () => {
    localStorage.setItem('user', 'true');
    setUser(true);
  };

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <AppRoutes
          user={user}
          onAuthButtonClick={handleLogin}
          isLoading={isLoading}
          music={music}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          error={error}
          setIsBar={setIsBar}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        {isBar && (
          <Player
            music={music}
            isLoading={isLoading}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
          />
        )}
      </UserContext.Provider>
    </>
  );
};

export default App;
