import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTracks } from '../../store/actions/creators/creators';
import { NavTrackSidebar } from '../../components/NavTrackSidebar';
import { Footer } from '../../components/Footer';
import { getFavouriteTracks } from '../../api/apiGetTracks';
import { refreshToken } from '../../api/authApi';
import * as S from './styles';

export const Favourites = ({
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

  const asyncFavouriteTrackAll = async () => {
    try {
      const favouriteMusic = await getFavouriteTracks(tokenAccess);
      dispatch(setAllTracks(favouriteMusic));
      setIsLoading(true);
    } catch (error) {
      if (error.message === 'Токен протух') {
        const newAccess = await refreshToken(tokenRefresh);
        localStorage.setItem('tokenAccess', JSON.stringify(newAccess));
        const favouriteMusic = await getFavouriteTracks(newAccess.access);
        dispatch(setAllTracks(favouriteMusic));
        return;
      }
      setError(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const allTracks = useSelector(setAllTracks);
  let music = allTracks.payload.tracks.tracks.allTracks;

  useEffect(() => {
    asyncFavouriteTrackAll();
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
