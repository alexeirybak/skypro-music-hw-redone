import styled, { keyframes } from 'styled-components';

export const SidebarBlock = styled.div`
  height: 100%;
  padding: 70px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const SidebarList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 30px;
`;

export const SidebarItem = styled.div`
  width: 250px;
  height: 150px;
`;

export const SidebarLink = styled.a`
  width: 100%;
  height: 100%;
`;

export const SidebarImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const blink = keyframes`
    from {
      opacity: 1;
    }
    to {
      opacity: 0.2;
    }
  }`;

export const SleketonSidebarImg = styled.div`
  background-color: var(--title-track-img);
  animation: ${blink} 1s infinite alternate;
  width: 250px;
  height: 150px;
`;
