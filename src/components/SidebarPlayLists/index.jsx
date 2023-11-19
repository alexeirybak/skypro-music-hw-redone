import { NavLink } from 'react-router-dom';
import { musicCategory } from '../../constants';
import * as S from './styles';

export const SidebarPlayLists = ({ isLoading }) => {
  return (
    <S.SidebarBlock>
      <S.SidebarList>
        {musicCategory.map((category) => (
          <S.SidebarItem key={category.id}>
            {isLoading ? (
              <NavLink to={`/category/${category.id}`}>
                <S.SidebarImg src={category.imgUrl} alt={category.alt} />
              </NavLink>
            ) : (
              <S.SleketonSidebarImg />
            )}
          </S.SidebarItem>
        ))}
      </S.SidebarList>
    </S.SidebarBlock>
  );
};
