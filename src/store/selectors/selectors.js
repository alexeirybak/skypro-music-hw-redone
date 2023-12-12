export const trackSelector = (store) => store.audioplayer;

export const allTracksSelector = (store) =>
  trackSelector(store)?.allTracks || [];

  export const favoriteTracksSelector = (store) =>
  trackSelector(store)?.favoriteTracks || [];

export const trackIdsSelector = (store) => trackSelector(store)?.id || [];

export const activeTrack = (store) => trackSelector(store)?.activeTrack || [];

