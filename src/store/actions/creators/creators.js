import {
  SET_CURRENT_TRACK,
  NEXT_TRACK,
  PREV_TRACK,
  TOGGLE_SHUFFLED,
  ALL_TRACKS,
  ADD_TRACK
} from '../types/types';

export const setAllTracks = (tracks) => ({
  type: ALL_TRACKS,
  payload: {
    tracks,
  },
});

export const addTracks = (tracks) => ({
  type: ADD_TRACK,
  payload: { tracks },
});

export const activeTrack = (track) => ({
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

