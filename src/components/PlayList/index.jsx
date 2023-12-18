import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import {
  activeTrack,
  setAllTracks,
  setSearchTerm,
  setFilter,
} from '../../store/actions/creators/creators';
import { addLike, disLike } from '../../api/apiGetTracks';
import { getAllTracks } from '../../api/apiGetTracks';
import { refreshToken } from '../../api/authApi';
import { durationFormatter } from '../../utils/durationFormatter';
import { tracks } from '../../constants';
import { TrackTitleSvg } from '../../utils/iconSVG/trackTitle';
import { TrackLikesMainSvg } from '../../utils/iconSVG/trackLikeMain';
import * as S from './styles';

export const PlayList = ({
  isLoading,
  setIsLoading,
  isPlaying,
  setIsPlaying,
  setError,
  dataFilter,
  setNumberTracks,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchTerm(null));
    dispatch(setFilter(null));
  }, []);

  const fetchTracks = async () => {
    try {
      const tracks = await getAllTracks();
      dispatch(setAllTracks(tracks));
      setIsLoading(true);
      setError(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const tokenRefresh = JSON.parse(localStorage.getItem('tokenRefresh'));
  const tokenAccess = JSON.parse(localStorage.getItem('tokenAccess'));
  const { user } = useContext(UserContext);
  const [disabled, setDisabled] = useState(false);
  const currentTrack = useSelector((state) => state.tracks.currentTrack);
  let music = useSelector((state) => state.tracks.allTracks);

  if (isLoading) {
    music = [...Array(12)].flatMap(() => tracks);
  }

  const handleTrackClick = (item) => {
    dispatch(activeTrack(item));
    setIsPlaying(true);
  };

  const toggleLike = async (item) => {
    try {
      setDisabled(true);
      if (item.stared_user.find((el) => el.id === user.id)) {
        await disLike({ token: tokenAccess, id: item.id });
      } else {
        await addLike({ token: tokenAccess, id: item.id });
      }
      const response = await getAllTracks();
      dispatch(setAllTracks(response));
    } catch (error) {
      if (error.message === 'Токен протух') {
        const newAccess = await refreshToken(tokenRefresh);
        localStorage.setItem('tokenAccess', JSON.stringify(newAccess));
        if (item.stared_user.find((el) => el.id === user.id)) {
          await disLike({ token: newAccess.access, id: item.id });
        } else {
          await addLike({ token: newAccess.access, id: item.id });
        }
        const response = await getAllTracks();
        dispatch(setAllTracks(response));
        return;
      }
    } finally {
      setDisabled(false);
    }
  };

  let filteredMusic = [...music];
  const symbols = useSelector((state) => state.tracks.letters);
  const filtersType = useSelector((state) => state.tracks.filterType);
  const filtersValues = useSelector((state) => state.tracks.filterValues);

  if (symbols) {
    filteredMusic = filteredMusic.filter((item) => {
      return (
        item.name.toLowerCase().includes(symbols.toLowerCase()) ||
        item.author.toLowerCase().includes(symbols.toLowerCase()) ||
        item.album.toLowerCase().includes(symbols.toLowerCase())
      );
    });
  }

  if (filtersType && filtersValues.length > 0) {
    filteredMusic = filteredMusic.filter((track) => {
      if (filtersType === 'authors') {
        return filtersValues.includes(track.author);
      } else if (filtersType === 'genres') {
        return filtersValues.includes(track.genre);
      }
      return true;
    });
  }

  if (dataFilter === 'Сначала старые') {
    filteredMusic = filteredMusic.sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date),
    );
  } else if (dataFilter === 'Сначала новые') {
    filteredMusic = filteredMusic.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date),
    );
  }

  useEffect(() => {
    if (setNumberTracks) {
      if (filteredMusic.length > 99) {
        setNumberTracks('99+');
      } else {
        setNumberTracks(filteredMusic.length);
      }
    }
  }, [filteredMusic, setNumberTracks]);

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
                  isPlaying={isPlaying}
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

          <S.TrackAuthor>
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

  return <S.ContentPlayList>{fullPlayList}</S.ContentPlayList>;
};
