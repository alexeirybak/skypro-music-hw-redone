import * as S from './styles';

export const ErrorBlock = ({ error }) => {
  return (
    <S.ErrorBlock>
      <S.ErrorMessage>
        Не удалось загрузить плейлист, попробуйте позже: {error}
      </S.ErrorMessage>
      <S.Img src='/img/404.gif' />
    </S.ErrorBlock>
  );
};
