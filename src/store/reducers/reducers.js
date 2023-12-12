import {
  SET_CURRENT_TRACK,
  NEXT_TRACK,
  PREV_TRACK,
  TOGGLE_SHUFFLED,
  ALL_TRACKS,
  FAVORITE_TRACKS,
} from '../actions/types/types.js';

const initialState = {
  track: null,
  shuffled: false,
  shuffledPlaylist: [],
  allTracks: [],
  favoriteTracks: [],
};

export default function trackReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_TRACKS: {
      const { tracks } = action.payload;
      return {
        ...state,
        allTracks: tracks,
      };
    }

    case FAVORITE_TRACKS: {
      const { tracks } = action.payload;

      return {
        ...state,
        favoriteTracks: tracks,
      };
    }

    case SET_CURRENT_TRACK: {
      const { track } = action.payload;
      return {
        ...state,
        currentTrack: track,
      };
    }

    case NEXT_TRACK: {
      const { track } = action.payload;
      return {
        ...state,
        currentTrack: track,
      };
    }

    case PREV_TRACK: {
      const { track } = action.payload;
      return {
        ...state,
        currentTrack: track,
      };
    }

    case TOGGLE_SHUFFLED: {
      const { shuffledPlaylist, shuffled } = action.payload;
      return {
        ...state,
        shuffled: !shuffled,
        shuffledPlaylist,
      };
    }

    default:
      return state;
  }
}
