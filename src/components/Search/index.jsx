import { IconSearchSvg } from '../../utils/iconSVG/iconSearch';
import { IconSearchHandleSvg } from '../../utils/iconSVG/iconSearchHandle';
import * as S from './styles';

export const Search = () => {

  return (
    <S.CenterBlockSearch>
      <S.Glass>
        <IconSearchSvg />
        <S.Handle>
          <IconSearchHandleSvg/>
        </S.Handle>
      </S.Glass>
      <S.SearchText type='search' placeholder='Поиск' name='search' />
    </S.CenterBlockSearch>
  );
};
