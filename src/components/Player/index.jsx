import { useState, useRef } from 'react';
import { ProgressBar } from '../ProgressBar';
import { BarPlayer } from '../BarPlayer';
import { VolumeBlock } from '../VolumeBlock';
import * as S from './styles';

export const Player = ({
  isLoading,
  isPlaying,
  setIsPlaying,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);

  const handleSeek = (newTime) => {
    setCurrentTime(newTime);
    if (audioRef && audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <S.Bar>
      <S.BarContent>
        <ProgressBar
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          duration={duration}
          setDuration={setDuration}
          onSeek={handleSeek}
          isPlaying={isPlaying}
        />
        <S.BarPlayerBlock>
          <BarPlayer
            isLoading={isLoading}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            duration={duration}
            setDuration={setDuration}
            audioRef={audioRef}
            volume={volume}
          />
          <S.EqVolBlock>
            {isPlaying ? (
              <S.Equalizer src='/img/equalizer.gif' alt='Эквалайзер' />
            ) : (
              <S.Equalizer src='/img/non-equalizer.png' alt='Эквалайзер' />
            )}
            <VolumeBlock
              audioRef={audioRef}
              volume={volume}
              setVolume={setVolume}
            />
          </S.EqVolBlock>
        </S.BarPlayerBlock>
      </S.BarContent>
    </S.Bar>
  );
};
