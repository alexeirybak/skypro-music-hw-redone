import styled, { css } from 'styled-components';

export const CenterBlockContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 897px) {
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100% 100%;
    background-image: linear-gradient(
      var(--container-bg) 0%,
      var(--container-bg) 100%
    ),
    url(${(props) =>
      props.$isPlaying ? '/img/abstract.gif' : '/img/abstract.jpeg'});
    background-attachment: fixed;
  }
  @media screen and (max-width: 471px) {
    background-size: cover;
  }
`;

export const MainCenterBlock = styled.div`
  width: auto;
  padding: 20px 40px 20px 40px;
  background-color: var(--container);
  transition: background-color 0.5s ease;
  @media screen and (max-width: 897px) {
    padding: 20px 20px 20px 20px;
  }
  @media screen and (max-width: 360px) {
    padding: 5px;
  }
`;

export const CenterBlockH2 = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 4rem;
  line-height: 72px;
  letter-spacing: -0.8px;
  margin-bottom: 45px;
  @media screen and (max-width: 471px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
`;
