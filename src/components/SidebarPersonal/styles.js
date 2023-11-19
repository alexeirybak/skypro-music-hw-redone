import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarPersonal = styled.div`
  display: -webkit-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 0 15px;
`;

export const SidebarPersonalName = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--main-text);
  margin-right: 16px;
`;

export const ButtonLogout = styled(NavLink)`
  background-color: var(--container);
  border: none;
`;
