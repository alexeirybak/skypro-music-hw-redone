import { SidebarPersonal } from '../SidebarPersonal';
import { SidebarPlayLists } from '../SidebarPlayLists';

import * as S from './styles';

export const MainSidebar = ({ isLoading }) => {
  return (
    <S.MainSidebar>
      <SidebarPersonal/>
      <SidebarPlayLists isLoading={isLoading}/>
    </S.MainSidebar>
  );
}
