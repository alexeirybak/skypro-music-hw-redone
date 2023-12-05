import styled, { css, keyframes } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
  transition: background-color 0.5s ease;
`;

export const Container = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  background-color: var(--container);
  transition: background-color 0.5s ease;
`;

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

export const PlaylistItem = styled.div`
  width: 100%;
  display: block;
  margin-bottom: 12px;
  cursor: pointer;
`;

export const PlaylistTrack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TrackTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 447px;
`;

export const TrackTitleComponent = styled.div`
  width: 51px;
  height: 51px;
  display: flex;
  align-items: center;
  background-color: var(--track-title-svg-bg);
`;

export const TrackTitleImage = styled.svg`
  width: 51px;
  height: 51px;
  margin-right: 16px;
  background-color: var(--title-track-img);
  display: flex;
  align-items: center;
  justify-content: center;
  rect {
    fill: var(--track-title-svg-bg);
  }
  path {
    stroke: var(--track-title-svg);
  }
  ellipse {
    stroke: var(--track-title-svg);
  }
`;

const blink = keyframes`
    from {
      opacity: 1;
    }
    to {
      opacity: 0.2;
    }
  }`;

export const SkeletonIcon = styled(TrackTitleImage)`
  background-color: var(--title-track-img);
  animation: ${blink} 1s infinite alternate;
`;

export const TrackTitleBlock = styled.div`
  margin-left: 17px;
  width: 356px;
  height: 19px;
`;

export const SkeletonTrackTitle = styled(TrackTitleBlock)`
  background-color: var(--title-track-img);
  animation: ${blink} 1s infinite alternate;
`;

export const SkeletonTrackAuthor = styled(TrackTitleBlock)`
  width: 271px;
  height: 19px;
  background-color: var(--title-track-img);
  animation: ${blink} 1s infinite alternate;
`;

export const TrackTitleLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--main-text);
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: var(--track-title-span);
    margin-left: 6px;
  }
`;

export const TrackAuthor = styled.div`
  width: 321px;
  display: flex;
  justify-content: flex-start;
`;

export const TrackAuthorLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--main-text);
  text-align: left;
`;

export const TrackAlbum = styled.div`
  width: 245px;
`;

export const TrackAlbumLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--play-list-title);
`;

export const TrackTimeComponent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const TrackTimeText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: var(--play-list-title);
`;

export const ContentPlayList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const LikeButton = styled.button`
  background-color: var(--container);
  border: none;
  cursor: pointer;
  padding-right: 10px;
`;
