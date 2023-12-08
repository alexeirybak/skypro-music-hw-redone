import { useState } from 'react';
import { NavTrackSidebar } from '../../components/NavTrackSidebar';
import { Player } from '../../components/Player';
import { Footer } from '../../components/Footer';
import * as S from './styles';

export const Favourites = ({
  isLoading,
  music,
  error,
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
}) => {
  
  const [isBar, setIsBar] = useState(false);
  const [pause, setPause] = useState(false);
  
  return (
    <S.Wrapper>
      <S.Container>
        <NavTrackSidebar
          pause={pause}
          isLoading={isLoading}
          music={music}
          setIsPlaying={setIsPlaying}
          setIsBar={setIsBar}
          error={error}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
        />
        
        <Footer />
      </S.Container>
    </S.Wrapper>
  );
};