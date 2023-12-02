export const trackSelector = (store) => store.audioplayer;

export const allTracksSelector = (store) =>
  trackSelector(store)?.allTracks || [];

export const trackIdsSelector = (store) => trackSelector(store)?.id || [];

export const activeTrackSelector = (store) =>
  trackSelector(store)?.activeTrack || [];

export const trackByIdSelector = (store, id) => {
  const trackStore = trackSelector(store);

  if (!trackStore) {
    return {};
  }

  const trackItem = trackStore[id];

  return {
    ...trackItem,
  };
};
