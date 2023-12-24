import { useState } from 'react';
import { PlayList } from '../PlayList';
import { Filter } from '../Filter';
import { Search } from '../Search';
import { ContentTitle } from '../../components/ContentTitle';
import { ErrorBlock } from '../ErrorBlock';
import * as S from './styles';

export const SidebarCenterBlock = ({
  isPlaying,
  setIsPlaying,
  isLoading,
  setIsLoading,
}) => {
  const [error, setError] = useState(null);
  const [dataFilter, setDataFilter] = useState('По умолчанию');
  const [numberTracks, setNumberTracks] = useState(null);

  return (
    <S.MainCenterBlock>
      <Search />
      <S.CenterBlockH2>Треки</S.CenterBlockH2>
      <Filter
        error={error}
        setDataFilter={setDataFilter}
        dataFilter={dataFilter}
        numberTracks={numberTracks}
      />
      <S.CenterBlockContent $isPlaying={isPlaying}>
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
            dataFilter={dataFilter}
            setNumberTracks={setNumberTracks}
          />
        )}
      </S.CenterBlockContent>
    </S.MainCenterBlock>
  );
};
