import { Nav } from '../Nav';
import { SidebarCenterBlock } from '../SidebarCenterblock';
import { MainSidebar } from '../MainSidebar';
import * as S from './styles.js';

export const NavTrackSidebar = ({
  isLoading,
  music,
  error,
  isPlaying,
  setIsPlaying,
  setIsBar,
  currentTrack,
  setCurrentTrack,
}) => {
  return (
    <S.NavTrackSidebar>
      <Nav />
      <SidebarCenterBlock
        isLoading={isLoading}
        music={music}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setIsBar={setIsBar}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        error={error}
      />
      <MainSidebar isLoading={isLoading} />
    </S.NavTrackSidebar>
  );
};
