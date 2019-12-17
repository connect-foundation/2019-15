import styled from 'styled-components';

const SelectStyle = styled.select`
  width: 80%;
  height: 2rem;
  margin-bottom: 1rem;
  margin-top: 0.2rem;
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.eastSide};

  :hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};
  }
`;

export default SelectStyle;
