import { useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { AppRoutes } from '../routes';
import { useSelector } from 'react-redux';
import { activeTrack } from '../store/actions/creators/creators';
import { Player } from './Player';
import { setTheme } from '../utils/theme';
import { GlobalStyle } from '../styles/global';

setTheme();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isPlaying, setIsPlaying] = useState(false);
  const getTrack = useSelector(activeTrack);
  const currentTrack = getTrack.payload.track.tracks.currentTrack;

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <AppRoutes
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        {currentTrack ? (
          <Player
            isLoading={isLoading}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        ) : null}
      </UserContext.Provider>
    </>
  );
};

export default App;
