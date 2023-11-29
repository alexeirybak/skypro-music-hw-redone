import { useState } from 'react';
import { NavTrackSidebar } from '../../components/NavTrackSidebar';
import { Footer } from '../../components/Footer';
import * as S from './styles';

export const Main = ({
  isLoading,
  isPlaying,
  music,
  error,
  setIsPlaying,
  setIsBar,
}) => {
  return (
    <S.Wrapper>
      <S.Container>
        <NavTrackSidebar
          setIsBar={setIsBar}
          isLoading={isLoading}
          music={music}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          error={error}
        />
        <Footer />
      </S.Container>
    </S.Wrapper>
  );
};
