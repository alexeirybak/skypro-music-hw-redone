import { useParams } from 'react-router-dom';
import { musicCategory } from '../../constants';
import * as S from './styles';

export function Category() {
  const params = useParams();

  const category = musicCategory.find((category) => category.id === Number(params.id));

  return (
    <S.CategoryBlock>
      <h1>CategoryPage {category.id}</h1>
      <img src={category.imgUrl} alt={category.alt} />
    </S.CategoryBlock>
  );
}
