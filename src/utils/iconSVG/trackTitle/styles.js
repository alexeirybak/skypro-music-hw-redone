import styled, { css } from 'styled-components';

export const TrackTitleImg = styled.svg`
  width: 51px;
  height: 51px;
  margin-right: 16px;
  background-color: var(--title-track-img);
  display: -webkit-box;
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

export const PlayingDot = styled.div`
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 15px;
  height: 15px;
  position: relative;
  ${({ pause, bubble_out }) =>
    !pause &&
    css`
      animation: ${bubble_out} 1.25s ease-in-out infinite both;
    `}
  &:before {
    content: '';
    position: relative;
    display: ${({ pause }) => (pause ? 'none' : 'block')};
    width: 300%;
    height: 300%;
    box-sizing: border-box;
    margin-left: -100%;
    margin-top: -100%;
    border-radius: 50%;
    background-color: #01a4e9;
    ${({ pause }) =>
      !pause &&
      css`
        animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      `}
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: ${({ pause }) => (pause ? '55%' : '100%')};
    display: block;
    width: 100%;
    height: 100%;
    background-color: #b672ff;
    border-radius: 15px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    ${({ pause }) =>
      !pause &&
      css`
        animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s
          infinite;
      `}
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(0.33);
    }
    80%,
    100% {
      opacity: 0;
    }
  }

  @keyframes pulse-dot {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }
`;

export const TrackTitleWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin: auto;
`;
