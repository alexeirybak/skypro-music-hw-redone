import { useState, useEffect } from 'react';
import { NavTrackSidebar } from '../../components/NavTrackSidebar';
import { Footer } from '../../components/Footer';
import { getFavouriteTracks } from '../../api/apiGetTracks';
import { refreshToken } from '../../api/authApi';
import * as S from './styles';

export const Favourites = ({ isPlaying, setIsPlaying, setIsBar }) => {
  const [music, setMusic] = useState([]);
  const tokenRefresh = JSON.parse(localStorage.getItem('tokenRefresh'));
  const tokenAccess = JSON.parse(localStorage.getItem('tokenAccess'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const asyncFavouriteTrackAll = async () => {
    try {
      const music = await getFavouriteTracks(tokenAccess);
      setMusic(music);
    } catch (error) {
      if (error.message === 'Токен протух') {
        const newAccess = await refreshToken(tokenRefresh);
        localStorage.setItem('tokenAccess', JSON.stringify(newAccess));
        const music = await getFavouriteTracks(newAccess.access);
        setMusic(music);
        return;
      }
      setError(error.message);
    } finally {
      console.log(music);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    asyncFavouriteTrackAll();
  }, []);

  return (
    <S.Wrapper>
      <S.Container>
        <NavTrackSidebar
          isLoading={isLoading}
          music={music}
          setMusic={setMusic}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setIsBar={setIsBar}
          error={error}
        />
        <Footer />
      </S.Container>
    </S.Wrapper>
  );
};
