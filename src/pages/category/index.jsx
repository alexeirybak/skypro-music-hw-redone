import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import {
  setAllTracks,
  activeTrack,
  setSearchTerm,
  setLikeState,
  setLoading,
  setPlaying
} from '../../store/actions/creators/creators';
import { addLike, disLike, getCategory } from '../../api/apiGetTracks';
import { ContentTitle } from '../../components/ContentTitle';
import { ErrorBlock } from '../../components/ErrorBlock';
import { refreshToken } from '../../api/authApi';
import { durationFormatter } from '../../utils/durationFormatter';
import { tracks } from '../../constants';
import { TrackTitleSvg } from '../../utils/iconSVG/trackTitle';
import { TrackLikesMainSvg } from '../../utils/iconSVG/trackLikeMain';
import { useParams } from 'react-router-dom';
import { musicCategory } from '../../constants';
import * as S from '../../pages/PlayList/styles';

export function Category() {
  const params = useParams();
  const category = musicCategory.find(
    (category) => category.id === Number(params.id),
  );
  const tokenRefresh = JSON.parse(localStorage.getItem('tokenRefresh'));
  let tokenAccess = JSON.parse(localStorage.getItem('tokenAccess'));
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();
  const symbols = useSelector((state) => state.tracks.letters);
  const isLoading = useSelector((state) => state.tracks.isLoading);
  const isPlaying = useSelector((state) => state.tracks.isPlaying);
  const currentTrack = useSelector((state) => state.tracks.currentTrack);
  let music = useSelector((state) => state.tracks.allTracks);

  useEffect(() => {
    dispatch(setSearchTerm(null));
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await getCategory({ id: params.id });
      const newArray = response.items.map((item) => {
        const { stared_user, ...rest } = item;
        return { ...rest, stared_user: stared_user };
      });
      dispatch(setAllTracks(newArray));
      dispatch(setLoading(false));
      setError(false);
    } catch (error) {
      dispatch(setLoading(true));
      setError(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchTracks();
  }, [params.id]);

  if (isLoading) {
    music = [...Array(12)].flatMap(() => tracks);
  }

  const handleTrackClick = (item) => {
    dispatch(activeTrack(item));
    setPlaying(true);
  };

  const toggleLike = async (item) => {
    try {
      setDisabled(true);
      if (item.stared_user.find((el) => el.id === user.id)) {
        await disLike({ token: tokenAccess, id: item.id });
        dispatch(setLikeState(false));
      } else {
        await addLike({ token: tokenAccess, id: item.id });
        dispatch(setLikeState(true));
      }
    } catch (error) {
      if (error.message === 'Токен протух') {
        const newAccess = await refreshToken(tokenRefresh);
        localStorage.setItem('tokenAccess', JSON.stringify(newAccess));
        tokenAccess = newAccess.access;
        if (item.stared_user.find((el) => el.id === user.id)) {
          await disLike({ token: newAccess.access, id: item.id });
          dispatch(setLikeState(false));
        } else {
          await addLike({ token: newAccess.access, id: item.id });
          dispatch(setLikeState(true));
        }
        return;
      }
    } finally {
      setDisabled(false);
      fetchTracks();
    }
  };

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
    const isLiked =
      Array.isArray(item.stared_user) &&
      item.stared_user.some((el) => el.id === user.id);

    return (
      <S.PlaylistItem key={i}>
        <S.PlaylistTrack>
          <S.TrackTitle>
            <S.TrackTitleComponent onClick={() => handleTrackClick(item)}>
              {!isLoading ? (
                <TrackTitleSvg
                  isCurrentPlaying={isCurrentPlaying}
                />
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
              <TrackLikesMainSvg isLiked={isLiked} />
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
        <S.CenterBlockH2>{category.alt}</S.CenterBlockH2>
        <S.CenterBlockContent $isPlaying={isPlaying}>
          <ContentTitle />
          {error ? (
            <ErrorBlock error={error} />
          ) : (
            <S.ContentPlayList>{fullPlayList}</S.ContentPlayList>
          )}
        </S.CenterBlockContent>
      </>
  );
}
