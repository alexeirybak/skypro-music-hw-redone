import { Nav } from '../Nav';
import { SidebarCenterBlock } from '../SidebarCenterblock';
import { MainSidebar } from '../MainSidebar';
import * as S from './styles.js';

export const NavTrackSidebar = ({
  isLoading,
  setIsLoading,
  isPlaying,
  setIsPlaying,
  error,
}) => {
  return (
    <S.NavTrackSidebar>
      <Nav />
      <SidebarCenterBlock
        error={error}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <MainSidebar isLoading={isLoading} />
    </S.NavTrackSidebar>
  );
};
