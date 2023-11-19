import { Nav } from '../Nav';
import { SidebarCenterBlock } from '../SidebarCenterblock';
import { MainSidebar } from '../MainSidebar';
import * as S from './styles.js';

export const NavTrackSidebar = ({
  isLoading,
  music,
  error,
  setIsPlaying,
  setIsBar,
  currentTrack,
  setCurrentTrack,
  pause,
}) => {
  return (
    <S.NavTrackSidebar>
      <Nav />
      <SidebarCenterBlock
        pause={pause}
        isLoading={isLoading}
        music={music}
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
