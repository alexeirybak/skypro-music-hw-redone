import { useState } from 'react';
import { NavTrackSidebar } from '../../components/NavTrackSidebar';
import { Footer } from '../../components/Footer';
import * as S from './styles';

export const Favourites = ({
  isLoading,
  music,
  error,
  isPlaying,
  setIsPlaying,
  setIsBar
}) => {

  return (
    <S.Wrapper>
      <S.Container>
        <NavTrackSidebar
          isLoading={isLoading}
          music={music}
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