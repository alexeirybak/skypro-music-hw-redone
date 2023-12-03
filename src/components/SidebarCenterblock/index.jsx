import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTracks } from '../../api/apiGetTracks';
import { PlayList } from '../PlayList';
import { Filter } from '../Filter';
import { Search } from '../Search';
import { PlayListTitleSvg } from '../../utils/iconSVG/playerListTitle';
import * as S from './styles';
import { setAllTracks } from '../../store/actions/creators/creators';

export const SidebarCenterBlock = ({
  isPlaying,
  setIsPlaying,
  setIsBar,
  isLoading,
  setIsLoading,
  error
}) => {
  

  return (
    <S.MainCenterBlock>
      <Search />
      <S.CenterBlockH2>Треки</S.CenterBlockH2>
      <Filter error={error} />
      <S.CenterBlockContent>
        <S.ContentTitle>
          <S.Col01>Трек</S.Col01>
          <S.Col02>ИСПОЛНИТЕЛЬ</S.Col02>
          <S.Col03>АЛЬБОМ</S.Col03>
          <S.Col04>
            <PlayListTitleSvg />
          </S.Col04>
        </S.ContentTitle>
        {error ? (
          <S.ErrorBlock>
            <S.ErrorMessage>
              Не удалось загрузить плейлист, попробуйте позже: {error}
            </S.ErrorMessage>
            <S.Img src='/img/404.gif' />
          </S.ErrorBlock>
        ) : (
          <PlayList
            isLoading={isLoading}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setIsBar={setIsBar}
          />
        )}
      </S.CenterBlockContent>
    </S.MainCenterBlock>
  );
};
