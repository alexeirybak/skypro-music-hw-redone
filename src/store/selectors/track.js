export const trackSelector = (store) => store.audioplayer;

export const trackIdsSelector = (store) => trackSelector(store)?.id || [];

export const trackCurrentTrack = (store) => store.audioplayer.track;

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
