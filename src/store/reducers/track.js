import {
  SET_CURRENT_TRACK,
  NEXT_TRACK,
  PREV_TRACK,
  TOGGLE_SHUFFLED,
} from '../actions/types/track.js';

const initialState = {
  track: null,
  shuffled: false,
  shuffledPlaylist: [],
  playing: false,
};

export default function trackReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_TRACK: {
      const { track } = action.payload;
      return {
        ...state,
        currentTrack: track,
        playing: true,
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
