import styled from 'styled-components';

const TextInputStyle = styled.input.attrs(() => ({
  type: 'text',
}))`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px;
  border-radius: 1rem;
  border: solid 1px lightgray;
  width: 85%
  height: 0.5rem;
  font-size: 20px;
  padding: 1rem;
`;

export default TextInputStyle;
