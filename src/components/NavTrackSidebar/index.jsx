import { Nav } from '../Nav';
import { SidebarCenterBlock } from '../SidebarCenterblock';
import { MainSidebar } from '../MainSidebar';
import * as S from './styles.js';

export const NavTrackSidebar = ({
  isLoading,
  setIsLoading,
  isPlaying,
  setIsPlaying,
  setIsBar,
}) => {
  return (
    <S.NavTrackSidebar>
      <Nav />
      <SidebarCenterBlock
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setIsBar={setIsBar}
      />
      <MainSidebar isLoading={isLoading} />
    </S.NavTrackSidebar>
  );
};
