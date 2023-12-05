import { NavTrackSidebar } from '../../components/NavTrackSidebar';
import * as S from './styles';

export const Main = ({
  isLoading,
  setIsLoading,
  isPlaying,
  setIsPlaying,
}) => {

  return (
    <S.Wrapper>
      <S.Container>
        <NavTrackSidebar
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
        />
      </S.Container>
    </S.Wrapper>
  );
};
