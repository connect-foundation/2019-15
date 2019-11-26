import styled from 'styled-components';

const TextInputStyle = styled.input.attrs(() => ({
  type: 'text',
}))`
    border-radius: 1rem;
    border: solid 1px lightgray;
    width: 85%
    height: 0.5rem;
    font-size: 20px;
    padding: 1rem;
`;

export default TextInputStyle;
