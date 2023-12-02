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
  return (
    <S.Wrapper>
      <S.Container>
        <NavTrackSidebar
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
