import { useState } from 'react';
import { NavTrackSidebar } from '../../components/NavTrackSidebar';
import { Footer } from '../../components/Footer';
import * as S from './styles';

export const Main = ({
  pause,
  isLoading,
  music,
  error,
  currentTrack,
  setCurrentTrack,
  setIsPlaying,
  setIsBar
}) => {
  return (
    <S.Wrapper>
      <S.Container>
        <NavTrackSidebar
          pause={pause}
          setIsBar={setIsBar}
          isLoading={isLoading}
          music={music}
          setIsPlaying={setIsPlaying}
          error={error}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
        />
        <Footer />
      </S.Container>
    </S.Wrapper>
  );
};
