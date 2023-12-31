import { useGetFavoriteTracksQuery } from '../../store/tracksApi';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAllTracks,
  activeTrack,
  setFavoriteTracks,
  setSearchTerm,
  setPlaying,
  setLikeState,
  setLoading,
} from '../../store/actions/creators/creators';
import { getFavoriteTracks, disLike } from '../../api/apiGetTracks';
import { ContentTitle } from '../../components/ContentTitle';
import { ErrorBlock } from '../../components/ErrorBlock';
import { refreshToken } from '../../api/authApi';
import { durationFormatter } from '../../utils/durationFormatter';
import { tracks } from '../../constants';
import { TrackTitleSvg } from '../../utils/iconSVG/trackTitle';
import { TrackLikesMainSvg } from '../../utils/iconSVG/trackLikeMain';
import * as S from '../../pages/PlayList/styles';

export const Favorites = () => {
  const tokenRefresh = JSON.parse(localStorage.getItem('tokenRefresh'));
  let tokenAccess = JSON.parse(localStorage.getItem('tokenAccess'));
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const {
    data: favoriteMusic = { items: [] },
    isLoading,
    isError,
  } = useGetFavoriteTracksQuery({ token: tokenAccess.access });

  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (!isLoading && !isError) {
    }
  }, [isLoading, isError, favoriteMusic]);

  

  useEffect(() => {
    dispatch(setSearchTerm(null));
  }, []);

  const fetchFavoriteTracks = async () => {
    try {
      const favoriteTracks = await getFavoriteTracks({
        token: tokenAccess.access,
      });
      if (!favoriteTracks[0]) {
      }
      dispatch(setFavoriteTracks(favoriteTracks));
      dispatch(setAllTracks(favoriteTracks));
      dispatch(setLikeState(true));
    } catch (error) {
      if (error.message === 'Токен протух') {
        const newAccess = await refreshToken(tokenRefresh);
        localStorage.setItem('tokenAccess', JSON.stringify(newAccess));
        tokenAccess = newAccess;
        const favoriteTracks = await getFavoriteTracks({
          token: newAccess.access,
        });
        dispatch(setFavoriteTracks(favoriteTracks));
        dispatch(setLoading(true));
      }
    }
  };

  useEffect(() => {
    fetchFavoriteTracks();
  }, []);

  const currentTrack = useSelector((state) => state.tracks.currentTrack);
  let music = useSelector((state) => state.tracks.favoriteTracks);

  if (isLoading) {
    music = [...Array(12)].flatMap(() => tracks);
  }

  const handleTrackClick = (item) => {
    dispatch(activeTrack(item));
    dispatch(setPlaying(true));
  };

  const toggleLike = async (item) => {
    try {
      setDisabled(true);
      const tokenAccess = JSON.parse(localStorage.getItem('tokenAccess'));
      await disLike({ token: tokenAccess, id: item.id });
      const response = await getFavoriteTracks({
        token: tokenAccess.access,
      });
      dispatch(setFavoriteTracks(response));
    } catch (error) {
      if (error.message === 'Токен протух') {
        const newAccess = await refreshToken(tokenRefresh);
        localStorage.setItem('tokenAccess', JSON.stringify(newAccess));
        await disLike({ token: newAccess.access, id: item.id });
        const response = await getFavoriteTracks({ token: newAccess.access });
        dispatch(setFavoriteTracks(response));
        return;
      }
    } finally {
      setDisabled(false);
    }
  };

  const symbols = useSelector((state) => state.tracks.letters);
  let filteredMusic = music;

  if (symbols) {
    filteredMusic = music.filter(
      (item) =>
        item.name.toLowerCase().includes(symbols.toLowerCase()) ||
        item.author.toLowerCase().includes(symbols.toLowerCase()) ||
        item.album.toLowerCase().includes(symbols.toLowerCase()),
    );
  }

  const fullPlayList = filteredMusic.map((item, i) => {
    const { name, author, album, duration_in_seconds } = item;
    const isCurrentPlaying = currentTrack && item.id === currentTrack.id;

    return (
      <S.PlaylistItem key={i}>
        <S.PlaylistTrack>
          <S.TrackTitle>
            <S.TrackTitleComponent onClick={() => handleTrackClick(item)}>
              {!isLoading ? (
                <TrackTitleSvg isCurrentPlaying={isCurrentPlaying} />
              ) : (
                <S.SkeletonIcon></S.SkeletonIcon>
              )}
            </S.TrackTitleComponent>

            <S.TrackTitleBlock onClick={() => handleTrackClick(item)}>
              {!isLoading ? (
                <S.TrackTitleLink>{name}</S.TrackTitleLink>
              ) : (
                <S.SkeletonTrackTitle></S.SkeletonTrackTitle>
              )}
            </S.TrackTitleBlock>
          </S.TrackTitle>

          <S.TrackAuthor onClick={() => handleTrackClick(item)}>
            {!isLoading ? (
              <S.TrackAuthorLink>{author}</S.TrackAuthorLink>
            ) : (
              <S.SkeletonTrackAuthor></S.SkeletonTrackAuthor>
            )}
          </S.TrackAuthor>
          <S.TrackAlbum>
            {!isLoading ? (
              <S.TrackAlbumLink>{album}</S.TrackAlbumLink>
            ) : (
              <S.SkeletonTrackAuthor></S.SkeletonTrackAuthor>
            )}
          </S.TrackAlbum>
          <S.TrackTimeComponent>
            <S.LikeButton disabled={disabled} onClick={() => toggleLike(item)}>
              <TrackLikesMainSvg isLiked={true} />
            </S.LikeButton>
            <S.TrackTimeText>
              {durationFormatter(duration_in_seconds)}
            </S.TrackTimeText>
          </S.TrackTimeComponent>
        </S.PlaylistTrack>
      </S.PlaylistItem>
    );
  });

  return (
    <>
      <S.CenterBlockH2>Любимые треки</S.CenterBlockH2>
      <S.CenterBlockContent>
        <ContentTitle />
        {isError ? (
          <ErrorBlock isError={isError} />
        ) : (
          <S.ContentPlayList>{fullPlayList}</S.ContentPlayList>
        )}
      </S.CenterBlockContent>
    </>
  );
};
