import { useState } from 'react';
import { PlayList } from '../PlayList';
import { Filter } from '../Filter';
import { Search } from '../Search';
import { ContentTitle } from '../../pages/favorites/styles';
import { ErrorBlock } from '../ErrorBlock';
import * as S from './styles';

export const SidebarCenterBlock = ({
  isPlaying,
  setIsPlaying,
  isLoading,
  setIsLoading,
}) => {
  const [error, setError] = useState(null);

  return (
    <S.MainCenterBlock>
      <Search />
      <S.CenterBlockH2>Треки</S.CenterBlockH2>
      <Filter error={error} />
      <S.CenterBlockContent>
        <ContentTitle />
        {error ? (
          <ErrorBlock error={error} />
        ) : (
          <PlayList
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isPlaying={isPlaying}
            setError={setError}
            setIsPlaying={setIsPlaying}
          />
        )}
      </S.CenterBlockContent>
    </S.MainCenterBlock>
  );
};
