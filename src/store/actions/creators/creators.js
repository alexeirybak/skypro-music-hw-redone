import {
  SET_CURRENT_TRACK,
  NEXT_TRACK,
  PREV_TRACK,
  TOGGLE_SHUFFLED,
  ALL_TRACKS,
  FAVORITE_TRACKS,
  SEARCH,
  FILTERS,
} from '../types/types';

export const setAllTracks = (tracks) => ({
  type: ALL_TRACKS,
  payload: {
    tracks,
  },
});

export const setFavoriteTracks = (tracks) => ({
  type: FAVORITE_TRACKS,
  payload: {
    tracks,
  },
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

export const setSearchTerm = (letters) => ({
  type: SEARCH,
  payload: {
    letters,
  },
});

export const setFilter = (filterType, filterValues) => {
  return {
    type: FILTERS,
    payload: {
      filterType,
      filterValues,
    },
  };
};