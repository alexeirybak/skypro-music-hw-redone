import styled from 'styled-components';

export const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--player-bg);
  transition: background-color 0.5s ease;
`;

export const BarContent = styled.div`
  display: -webkit-box;
  display: flex;
  flex-direction: column;
`;

export const BarPlayerBlock = styled.div`
  height: 73px;
  display: -webkit-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--container);
`;
