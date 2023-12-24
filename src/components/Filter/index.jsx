import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTracks, setFilter } from '../../store/actions/creators/creators';
import { releaseDateFormatter } from '../../utils/releaseDateFormatter';
import * as S from './styles';

export const Filter = ({
  error,
  setDataFilter,
  dataFilter,
  numberTracks,
}) => {
  const [openMenu, setOpenMenu] = useState('');
  const dispatch = useDispatch();
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [activeAuthors, setActiveAuthors] = useState(false);
  const [activeGenres, setActiveGenres] = useState(false);

  const handleAuthorClick = (author) => {
    setActiveGenres(false);
    setSelectedAuthors((prevSelected) => {
      if (prevSelected.includes(author)) {
        return prevSelected.filter((a) => a !== author);
      } else {
        return [...prevSelected, author];
      }
    });
  };

  const handleGenreClick = (genre) => {
    setActiveAuthors(false);
    setSelectedGenres((prevSelected) => {
      if (prevSelected.includes(genre)) {
        return prevSelected.filter((g) => g !== genre);
      } else {
        return [...prevSelected, genre];
      }
    });
  };

  useEffect(() => {
    dispatch(setFilter('authors', selectedAuthors));
  }, [selectedAuthors, dispatch]);

  useEffect(() => {
    dispatch(setFilter('genres', selectedGenres));
  }, [selectedGenres, dispatch]);

  const handleMenuClick = (menu) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  const allTracks = useSelector(setAllTracks);
  let music = allTracks.payload.tracks.tracks.allTracks;
  const formattedAuthorList = [...new Set(music.map((item) => item.author))];
  const formattedYearList = releaseDateFormatter.map((item) => item);
  const genreList = [...new Set(music.map((item) => item.genre))];

  const toggleMenu = (menuName) => {
    setOpenMenu((prevMenu) => (prevMenu === menuName ? '' : menuName));
  };

  return (
    <S.CenterBlockFilter onMouseLeave={() => setOpenMenu('')}>
      <S.FilterTitle>Искать по:</S.FilterTitle>
      <S.FilterList>
        <S.FilterButton
          as={openMenu === 'author' && S.BtnTextActive}
          onClick={() => handleMenuClick('author')}
          disabled={error}
        >
          исполнителю
        </S.FilterButton>
        {openMenu === 'author' && selectedAuthors.length > 0 && (
          <S.FilterCounter>{numberTracks}</S.FilterCounter>
        )}
        <S.FilterContent $isAuthorMenuOpen={openMenu === 'author'}>
          <S.FilterBlock>
            <S.FilterListMenu>
              {formattedAuthorList.map((item) => (
                <S.FilterListMenuItem key={item}>
                  <S.FilterListMenuLink
                    onClick={() => handleAuthorClick(item)}
                    $active={selectedAuthors.includes(item) || activeAuthors}
                  >
                    {item}
                  </S.FilterListMenuLink>
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
          disabled={error}
        >
          году выпуска
        </S.FilterButton>

        <S.FilterContentYear $isYearMenuOpen={openMenu === 'year'}>
          <S.FilterBlock>
            <S.FilterListMenu>
              {formattedYearList.map((item) => (
                <S.FilterListMenuItem key={item}>
                  <S.FilterListMenuLink
                    onClick={() => setDataFilter(item)}
                    $active={dataFilter.includes(item)}
                  >
                    {item}
                  </S.FilterListMenuLink>
                </S.FilterListMenuItem>
              ))}
            </S.FilterListMenu>
          </S.FilterBlock>
        </S.FilterContentYear>
      </S.FilterList>
      <S.FilterList>
        <S.FilterButton
          as={openMenu === 'genre' && S.BtnTextActive}
          onClick={() => handleMenuClick('genre')}
          disabled={error}
        >
          жанру
        </S.FilterButton>
        {openMenu === 'genre' && selectedGenres.length > 0 && (
          <S.FilterCounter>{numberTracks}</S.FilterCounter>
        )}
        <S.FilterContentGenre $isGenreMenuOpen={openMenu === 'genre'}>
          <S.FilterBlock>
            <S.FilterListMenu>
              {genreList.map((item) => (
                <S.FilterListMenuItem key={item}>
                  <S.FilterListMenuLink
                    onClick={() => handleGenreClick(item)}
                    $active={selectedGenres.includes(item) || activeGenres}
                  >
                    {item}
                  </S.FilterListMenuLink>
                </S.FilterListMenuItem>
              ))}
            </S.FilterListMenu>
          </S.FilterBlock>
        </S.FilterContentGenre>
      </S.FilterList>
    </S.CenterBlockFilter>
  );
};
