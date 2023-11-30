import { useState, useEffect } from 'react';
import { getTrackById } from '../../api/apiGetTracks';
import {
  activeTrackSelector,
  nextTrack,
  prevTrack,
  toggleShuffled,
} from '../../store/actions/creators/creators';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerBtnPrevSvg } from '../../utils/iconSVG/playerBtnPrev';
import { PlayerBtnPlaySvg } from '../../utils/iconSVG/playerBtnPlay';
import { PlayerBtnPauseSvg } from '../../utils/iconSVG/playerBtnPause';
import { PlayerBtnNextSvg } from '../../utils/iconSVG/playerBtnNext';
import { PlayerBtnRepeatSvg } from '../../utils/iconSVG/playerBtnRepeat';
import { PlayerBtnShuffleSvg } from '../../utils/iconSVG/playerBtnShuffle';
import * as S from './styles';

export const PlayerControls = ({
  music,
  trackId,
  isPlaying,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  audioRef,
  volume,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledTracks, setShuffledTracks] = useState([]);
  const [shuffledIndex, setShuffledIndex] = useState(0);
  const [shuffleTrackEnable, setShuffleTrackEnable] = useState(false);
  const [trackHistory, setTrackHistory] = useState([]);

  const getTrack = useSelector(activeTrackSelector);
  const currentTrack = getTrack.payload.track.tracks.currentTrack;

  useEffect(() => {
    const newIndex = shuffleTrackEnable
      ? shuffledTracks.findIndex((item) => item.id === currentTrack.id)
      : music.findIndex((item) => item.id === currentTrack.id);

    if (newIndex !== -1) {
      if (shuffleTrackEnable) {
        setShuffledIndex(newIndex);
      } else {
        setCurrentIndex(newIndex);
      }
    }
  }, [currentTrack, shuffleTrackEnable]);

  useEffect(() => {
    handleStart();
  }, [currentTrack]);

  const handleStart = () => {
    if (loaded) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (loaded) {
      handleStart();
    }
  }, [loaded]);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const track = await getTrackById(trackId);
        setCurrentTrack(track);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTrack();
  }, [trackId]);

  useEffect(() => {
    setLoaded(false);
  }, [currentTrack.track_file]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack.track_file, audioRef]);

  const toggleLoop = () => {
    setIsLoop(!isLoop);
  };

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [currentTrack.track_file, audioRef, volume]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleNextTrack = () => {
    let nextIndex;

    if (shuffleTrackEnable) {
      if (shuffledIndex === shuffledTracks.length - 1) {
        return;
      }

      nextIndex = shuffledIndex + 1;
      setShuffledIndex(nextIndex);
    } else {
      if (currentIndex === music.length - 1) {
        return;
      }

      nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    }

    setTrackHistory((prevHistory) => [...prevHistory, currentTrack]);

    const nextMusic = music[nextIndex];
    activeTrackSelector(nextMusic);

    dispatch(nextTrack(nextMusic));
    setLoaded(false);
  };

  const handlePrevTrack = () => {
    let prevIndex;

    if (audioRef.current.currentTime > 5) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    if (trackHistory.length > 0) {
      const prevMusic = trackHistory.pop();
      setTrackHistory((prevHistory) => [...prevHistory]);
      activeTrackSelector(prevMusic);
      dispatch(prevTrack(prevMusic));
      setLoaded(false);
    } else {
      if (shuffleTrackEnable) {
        if (shuffledIndex === 0) {
          return;
        }
        prevIndex = shuffledIndex - 1;
        setShuffledIndex(prevIndex);
      } else {
        if (currentIndex === 0) {
          return;
        }
        prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
      }

      const prevMusic = shuffleTrackEnable
        ? shuffledTracks[prevIndex]
        : music[prevIndex];
      activeTrackSelector(prevMusic);

      dispatch(prevTrack(prevMusic));
      setLoaded(false);
    }
  };

  const shuffleTracks = () => {
    const shuffledMusic = [...music];
    for (let i = shuffledMusic.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledMusic[i], shuffledMusic[j]] = [
        shuffledMusic[j],
        shuffledMusic[i],
      ];
    }
    return shuffledMusic;
  };

  useEffect(() => {
    if (shuffleTrackEnable) {
      const newShuffledTracks = shuffleTracks();
      setShuffledTracks(newShuffledTracks);
      setShuffledIndex(0);
    } else {
      setShuffledTracks([]);
    }
  }, [shuffleTrackEnable]);

  const handleShuffle = () => {
    if (!shuffleTrackEnable) {
      setShuffleTrackEnable(true);
      const newShuffledTracks = shuffleTracks();
      setShuffledTracks(newShuffledTracks);
      setShuffledIndex(0);
      dispatch(toggleShuffled(newShuffledTracks, true));
    } else {
      setShuffleTrackEnable(false);
      setShuffledTracks([]);
      dispatch(toggleShuffled([], false));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        loop={isLoop}
        onEnded={handleNextTrack}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={() => setLoaded(true)}
      ></audio>
      <S.PlayerControls>
        <S.PlayerBtnPrev onClick={handlePrevTrack}>
          <PlayerBtnPrevSvg alt='Предыдущий трек' />
        </S.PlayerBtnPrev>
        <S.PlayerBtnPlay
          onClick={() => {
            if (loaded) {
              setIsPlaying(!isPlaying);
            }
          }}
        >
          {isPlaying ? (
            <PlayerBtnPauseSvg alt='Пауза' />
          ) : (
            <PlayerBtnPlaySvg alt='Играть' />
          )}
        </S.PlayerBtnPlay>
        <S.PlayerBtnNext onClick={handleNextTrack}>
          <PlayerBtnNextSvg alt='Следующий трек' />
        </S.PlayerBtnNext>
        <S.PlayerBtnRepeat onClick={toggleLoop}>
          <PlayerBtnRepeatSvg isLoop={isLoop} alt='Повтор' />
        </S.PlayerBtnRepeat>
        <S.PlayerBtnShuffle onClick={handleShuffle}>
          <PlayerBtnShuffleSvg
            shuffleTrackEnable={shuffleTrackEnable}
            alt='Случайный порядок'
          />
        </S.PlayerBtnShuffle>
      </S.PlayerControls>
    </>
  );
};
