import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { activeTrackSelector } from '../../store/actions/creators/creators';
import { TrackPlaySvg } from '../../utils/iconSVG/trackPlay';
import { TrackPlayLikeSvg } from '../../utils/iconSVG/trackPlayLike';
import { TrackPlayDislikeSvg } from '../../utils/iconSVG/trackPlayDislike';
import * as S from './styles';

export const PlayerTrackPlay = ({ isLoading, isPlaying, setIsPlaying }) => {
  useEffect(() => {
    setIsPlaying(isPlaying);
  }, [isPlaying]);

  const getTrack = useSelector(activeTrackSelector);
  const currentTrack = getTrack.payload.track.tracks.currentTrack;

  return (
    <S.PlayerTrackPlay>
      <S.TrackPlayerContain>
        {isLoading ? (
          <S.TrackPlayerImage>
            <S.TrackPlayerBlock>
              <TrackPlaySvg />
            </S.TrackPlayerBlock>
          </S.TrackPlayerImage>
        ) : (
          <S.SkeletonIcon></S.SkeletonIcon>
        )}
        {isLoading ? (
          <S.TrackPlayAuthor>
            <S.TrackPlayAuthorLink>{currentTrack.name}</S.TrackPlayAuthorLink>
          </S.TrackPlayAuthor>
        ) : (
          <S.SceletonAuthor></S.SceletonAuthor>
        )}
        {isLoading ? (
          <S.TrackPlayAlbum>
            <S.TrackPlayAlbumLink>
              {currentTrack.author === '-'
                ? 'Неизвестный'
                : currentTrack.author}
            </S.TrackPlayAlbumLink>
          </S.TrackPlayAlbum>
        ) : (
          <S.SceletonAlbum></S.SceletonAlbum>
        )}
      </S.TrackPlayerContain>
      <S.TrackPlayLikesDisplay>
        <S.TrackPlayLike>
          <TrackPlayLikeSvg />
        </S.TrackPlayLike>
        <S.TrackPlayDislike>
          <TrackPlayDislikeSvg />
        </S.TrackPlayDislike>
      </S.TrackPlayLikesDisplay>
    </S.PlayerTrackPlay>
  );
};
