import styled from 'styled-components';
import ButtonStyle from 'components/globalComponents/Button/Button.style';

export const DoneButton = styled(ButtonStyle)`
  width: 3rem;
  height: 1.5rem;
  margin-left: auto;
  margin-right: 0;
  border: 1px solid white;
`;

export const Input = styled.input.attrs(() => ({
  type: 'text',
  placeholder: '친구 닉네임..',
}))`
  width: 5rem;
  height: 1.3rem;
  margin-right: 0.4rem;
  margin-left: -0.5rem;
  border-radius: 1rem;
  border: 0;
`;
