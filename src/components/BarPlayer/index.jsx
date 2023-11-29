import { PlayerControls } from '../PlayerControl';
import { PlayerTrackPlay } from '../PlayerTrackPlay';
import * as S from './styles';

export const BarPlayer = ({
  music,
  isLoading,
  isPlaying,
  setIsPlaying,
  ...restParams
}) => {
 
  return (
    <S.BarPlayer>
      <PlayerControls
        music={music}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        {...restParams}
      />
      <PlayerTrackPlay
        music={music}
        isLoading={isLoading}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </S.BarPlayer>
  );
};
