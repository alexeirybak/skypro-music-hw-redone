import styled, { css } from 'styled-components';

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