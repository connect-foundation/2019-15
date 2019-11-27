import styled from 'styled-components';

const TextInputStyle = styled.input`
  appearance: none;
  background: #fff;
  background-image: none;
  border: 0.05rem solid #bcc3ce;
  border-radius: 0.1rem;
  color: #3b4351;
  display: block;
  font-size: 0.8rem;
  height: 1.8rem;
  line-height: 1.2rem;
  max-width: 100%;
  outline: none;
  padding: 0.25rem 0.4rem;
  position: relative;
  transition: background 0.2s, border 0.2s, box-shadow 0.2s, color 0.2s;
  width: 100%;
  :focus {
    border-color: ${(props) => props.theme.royalBlue};
    box-shadow: 0 0 0 0.1rem ${(props) => props.theme.royal}20;
  }
`;

export default TextInputStyle;
