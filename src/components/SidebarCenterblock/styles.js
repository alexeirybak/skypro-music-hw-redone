import styled, { css } from 'styled-components';

export const MainCenterBlock = styled.div`
  width: auto;
  flex-grow: 3;
  padding: 20px 40px 20px 111px;
`;

export const CenterBlockH2 = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  margin-bottom: 45px;
`;

export const CenterBlockContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const PlaylistTitleColMixin = css`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 2px;
  color: var(--play-list-title);
  text-transform: uppercase;
`;

export const Col01 = styled.div`
  width: 447px;
  ${PlaylistTitleColMixin};
`;

export const Col02 = styled.div`
  width: 321px;
  ${PlaylistTitleColMixin};
`;

export const Col03 = styled.div`
  width: 245px;
  ${PlaylistTitleColMixin};
`;

export const Col04 = styled.div`
  width: 60px;
  text-align: end;
  ${PlaylistTitleColMixin};
`;

export const ErrorBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ErrorMessage = styled.p`
  font-size: 24px;
  color: #ad61ff;
`;

export const Img = styled.img`
  margin-top: 30px;
  max-width: 200px;
`;
