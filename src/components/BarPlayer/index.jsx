import { PlayerControls } from '../PlayerControl';
import { PlayerTrackPlay } from '../PlayerTrackPlay';
import * as S from './styles';

export const BarPlayer = ({
  isLoading,
  isPlaying,
  setIsPlaying,
  ...restParams
}) => {
 
  return (
    <S.BarPlayer>
      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        {...restParams}
      />
      <PlayerTrackPlay
        isLoading={isLoading}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </S.BarPlayer>
  );
};
