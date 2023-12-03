import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTracks, setFavoriteTracks } from '../../store/actions/creators/creators';
import { NavTrackSidebar } from '../../components/NavTrackSidebar';
import { Footer } from '../../components/Footer';
import { getFavoriteTracks } from '../../api/apiGetTracks';
import { refreshToken } from '../../api/authApi';
import * as S from './styles';

export const Favorites = ({
  isPlaying,
  setIsPlaying,
  setIsBar,
  isLoading,
  setIsLoading,
}) => {
  const tokenRefresh = JSON.parse(localStorage.getItem('tokenRefresh'));
  const tokenAccess = JSON.parse(localStorage.getItem('tokenAccess'));
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const asyncFavoriteTrackAll = async () => {
    try {
      const favoriteMusic = await getFavoriteTracks(tokenAccess);
      setIsLoading(true);
      console.log(favoriteMusic);
      dispatch(setFavoriteTracks(favoriteMusic));
    } catch (error) {
      if (error.message === 'Токен протух') {
        const newAccess = await refreshToken(tokenRefresh);
        localStorage.setItem('tokenAccess', JSON.stringify(newAccess));
        const favoriteMusic = await getFavoriteTracks(newAccess.access);
        dispatch(setFavoriteTracks(favoriteMusic));
        return;
      } 
      setError(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false); 
    }
  }; 

  useEffect(() => {
    asyncFavoriteTrackAll();
  }, []);

  return (
    <S.Wrapper>
      <S.Container>
        <NavTrackSidebar
          setIsLoading={setIsLoading}
          isLoading={isLoading}
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
