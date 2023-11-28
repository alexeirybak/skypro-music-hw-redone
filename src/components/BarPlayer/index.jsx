import { PlayerControls } from '../PlayerControl';
import { PlayerTrackPlay } from '../PlayerTrackPlay';
import * as S from './styles';

export const BarPlayer = ({
  music,
  isLoading,
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
  ...restParams
}) => {
 
  return (
    <S.BarPlayer>
      <PlayerControls
        music={music}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        {...restParams}
      />
      <PlayerTrackPlay
        music={music}
        isLoading={isLoading}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </S.BarPlayer>
  );
};
