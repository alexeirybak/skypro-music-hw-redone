import { useState, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import { AppRoutes } from './routes';
import { setTheme } from './utils/theme';
import { getAllTracks } from './api/apiGetTracks';
import { GlobalStyle } from './styles/global';

setTheme();

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [music, setMusic] = useState([]);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

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
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          error={error}
        />
      </UserContext.Provider>
    </>
  );
};

export default App;
