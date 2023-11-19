import { useState } from 'react';
import { releaseDateFormatter } from '../../utils/releaseDateFormatter';
import * as S from './styles';

export const Filter = ({ isLoading, error, music }) => {
  const formattedAuthorList = [
    ...new Set(
      music.map((item) => (item.author === '-' ? 'Неизвестный' : item.author)),
    ),
  ];
  const formattedYearList = releaseDateFormatter([
    ...new Set(music.map((item) => item.release_date)),
  ]);
  const genreList = [...new Set(music.map((item) => item.genre))];

  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menuName) => {
    setOpenMenu((prevMenu) => (prevMenu === menuName ? '' : menuName));
  };

  return (
    <S.CenterBlockFilter>
      <S.FilterTitle>Искать по:</S.FilterTitle>
      <S.FilterList>
        <S.FilterButton
          as={openMenu === 'author' && S.BtnTextActive}
          onClick={() => toggleMenu('author')}
          disabled={error || isLoading}
        >
          исполнителю
        </S.FilterButton>
        {openMenu === 'author' ? (
          <S.FilterCounter>{formattedAuthorList.length}</S.FilterCounter>
        ) : (
          ''
        )}
        <S.FilterContent $isAuthorMenuOpen={openMenu === 'author'}>
          <S.FilterBlock>
            <S.FilterListMenu>
              {formattedAuthorList.map((item) => (
                <S.FilterListMenuItem key={item}>
                  <S.FilterListMenuLink href='#'>{item}</S.FilterListMenuLink>
                </S.FilterListMenuItem>
              ))}
            </S.FilterListMenu>
          </S.FilterBlock>
        </S.FilterContent>
      </S.FilterList>
      <S.FilterList>
        <S.FilterButton
          as={openMenu === 'year' && S.BtnTextActive}
          onClick={() => toggleMenu('year')}
          disabled={error || isLoading}
        >
          году выпуска
        </S.FilterButton>
        {openMenu === 'year' ? (
          <S.FilterCounter>{formattedYearList.length}</S.FilterCounter>
        ) : (
          ''
        )}
        <S.FilterContentYear $isYearMenuOpen={openMenu === 'year'}>
          <S.FilterBlock>
            <S.FilterListMenuYear>
              {formattedYearList.map((item) => (
                <S.FilterListMenuItem key={item}>
                  <S.FilterListMenuLink href='#'>{item}</S.FilterListMenuLink>
                </S.FilterListMenuItem>
              ))}
            </S.FilterListMenuYear>
          </S.FilterBlock>
        </S.FilterContentYear>
      </S.FilterList>
      <S.FilterList>
        <S.FilterButton
          as={openMenu === 'genre' && S.BtnTextActive}
          onClick={() => toggleMenu('genre')}
          disabled={error || isLoading}
        >
          жанру
        </S.FilterButton>
        {openMenu === 'genre' ? (
          <S.FilterCounter>{genreList.length}</S.FilterCounter>
        ) : (
          ''
        )}
        <S.FilterContentGenre $isGenreMenuOpen={openMenu === 'genre'}>
          <S.FilterBlock>
            <S.FilterListMenu>
              {genreList.map((item) => (
                <S.FilterListMenuItem key={item}>
                  <S.FilterListMenuLink href='#'>{item}</S.FilterListMenuLink>
                </S.FilterListMenuItem>
              ))}
            </S.FilterListMenu>
          </S.FilterBlock>
        </S.FilterContentGenre>
      </S.FilterList>
    </S.CenterBlockFilter>
  );
};
