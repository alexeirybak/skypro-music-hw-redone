import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTracks } from '../../api/apiGetTracks';
import { setAllTracks } from '../../store/actions/creators/creators';
import { NavTrackSidebar } from '../../components/NavTrackSidebar';
import { Footer } from '../../components/Footer';
import * as S from './styles';

export const Main = ({
  isLoading,
  setIsLoading,
  isPlaying,
  setIsPlaying,
  setIsBar,
}) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchTracks() {
      try {
        const tracks = await getAllTracks();
        dispatch(setAllTracks(tracks));
        setIsLoading(true);
        setError(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTracks();
  }, [dispatch]);
  return (
    <S.Wrapper>
      <S.Container>
        <NavTrackSidebar
          error={error}
          setIsBar={setIsBar}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
        />
        <Footer />
      </S.Container>
    </S.Wrapper>
  );
};
