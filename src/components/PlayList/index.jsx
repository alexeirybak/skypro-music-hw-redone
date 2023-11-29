import { useDispatch, useSelector } from 'react-redux';
import { activeTrackSelector } from '../../store/actions/creators/creators';
import { durationFormatter } from '../../utils/durationFormatter';
import { tracks } from '../../constants';
import { TrackTitleSvg } from '../../utils/iconSVG/trackTitle';
import { TrackTimeSvg } from '../../utils/iconSVG/trackTime';
import * as S from './styles';

export const PlayList = ({
  isLoading,
  music,
  isPlaying,
  setIsPlaying,
  setIsBar
}) => {
  if (!isLoading) {
    music = [...Array(12)].flatMap(() => tracks);
  }

  const dispatch = useDispatch();
  const getTrack = useSelector(activeTrackSelector);
  const currentTrack = getTrack.payload.track.tracks.currentTrack;

  const handleTrackClick = (item) => {
    dispatch(activeTrackSelector(item));
    setIsPlaying(true);
    setIsBar(true);
  };

  const fullPlayList = music.map((item, i) => {
    const { name, author, album, duration_in_seconds } = item;
    const updatedAuthor = author === '-' ? 'Неизвестный' : author;
    const isCurrentPlaying = currentTrack && item.id === currentTrack.id;

    return (
      <S.PlaylistItem key={i} onClick={() => handleTrackClick(item)}>
        <S.PlaylistTrack>
          <S.TrackTitle>
            <S.TrackTitleComponent>
              {isLoading ? (
                <TrackTitleSvg
                  isCurrentPlaying={isCurrentPlaying}
                  isPlaying={isPlaying}
                />
              ) : (
                <S.SkeletonIcon></S.SkeletonIcon>
              )}
            </S.TrackTitleComponent>
            <S.TrackTitleBlock>
              {isLoading ? (
                <S.TrackTitleLink>{name}</S.TrackTitleLink>
              ) : (
                <S.SkeletonTrackTitle></S.SkeletonTrackTitle>
              )}
            </S.TrackTitleBlock>
          </S.TrackTitle>

          <S.TrackAuthor>
            {isLoading ? (
              <S.TrackAuthorLink>{updatedAuthor}</S.TrackAuthorLink>
            ) : (
              <S.SkeletonTrackAuthor></S.SkeletonTrackAuthor>
            )}
          </S.TrackAuthor>
          <S.TrackAlbum>
            {isLoading ? (
              <S.TrackAlbumLink>{album}</S.TrackAlbumLink>
            ) : (
              <S.SkeletonTrackAuthor></S.SkeletonTrackAuthor>
            )}
          </S.TrackAlbum>
          <S.TrackTimeComponent>
            <TrackTimeSvg />
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
