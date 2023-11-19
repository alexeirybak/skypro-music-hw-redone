import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MainNav = styled.nav`
  width: 244px;
  background-color: var(--main-nav);
  transition: background-color 0.5s ease;
  padding: 20px 0 20px 36px;
`;

export const NavLogo = styled.div`
  width: 113.33px;
  height: 43px;
  padding: 13px 0;
  background-color: transparent;
  margin-bottom: 20px;
`;

export const NavBurger = styled.div`
  width: 20px;
  height: 36px;
  padding: 13px 0;
  margin-bottom: 20px;
  display: -webkit-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

export const BurgerLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: var(--burger-line);
`;

export const MenuContent = styled.div`
  max-height: 0;
  overflow: hidden;
  transition:
    background-color 0.5s ease,
    max-height 0.5s ease;
  background-color: var(--main-nav);
  z-index: 1;
  max-height: ${({ $menuVisible }) => ($menuVisible ? '220px' : '0')};
`;

export const MenuList = styled.ul`
  padding: 18px 0 10px;
`;

export const MenuItem = styled.li`
  padding: 5px 0;
  margin-bottom: 16px;
`;

export const MenuLink = styled(NavLink)`
  color: var(--main-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: inline-block;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #ad61ff;
    transition:
      width 0.3s ease,
      left 0.3s ease;
  }

  &:hover::before,
  &:active::before,
  &.active::before {
    left: 0;
    width: 100%;
  }
`;
