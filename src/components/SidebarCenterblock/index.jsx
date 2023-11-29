import { PlayList } from '../PlayList';
import { Filter } from '../Filter';
import { Search } from '../Search';
import { PlayListTitleSvg } from '../../utils/iconSVG/playerListTitle';
import * as S from './styles';

export const SidebarCenterBlock = ({
  isLoading,
  music,
  error,
  isPlaying,
  setIsPlaying,
  setIsBar,
}) => {
  
  return (
    <S.MainCenterBlock>
      <Search />
      <S.CenterBlockH2>Треки</S.CenterBlockH2>
      <Filter music={music} error={error} />
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
            music={music}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setIsBar={setIsBar}
          />
        )}
      </S.CenterBlockContent>
    </S.MainCenterBlock>
  );
};
