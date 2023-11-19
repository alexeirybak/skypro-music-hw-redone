import {
  SET_CURRENT_TRACK,
  NEXT_TRACK,
  PREV_TRACK,
  TOGGLE_SHUFFLED,
} from '../types/types';

export const setCurrentTrack = (track) => ({
  type: SET_CURRENT_TRACK,
  payload: {
    track,
  },
});

export const nextTrack = (track) => ({
  type: NEXT_TRACK,
  payload: {
    track,
  },
});

export const prevTrack = (track) => ({
  type: PREV_TRACK,
  payload: {
    track,
  },
});

export const toggleShuffled = (shuffledPlaylist, shuffled) => ({
  type: TOGGLE_SHUFFLED,
  payload: {
    shuffledPlaylist,
    shuffled,
  },
});