import styled from 'styled-components';

const InputStyle = styled.input.attrs((props) => ({
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

export default InputStyle;
