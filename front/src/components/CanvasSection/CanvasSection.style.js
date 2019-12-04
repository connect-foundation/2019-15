import styled from 'styled-components';

const CanvasSectionStyle = styled.div`
  position: relative;
  margin-top: 0.5rem;
  & > section {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 790px;
    margin-left: 0.5rem;
    padding-left: 10px;
    background-color: ${props=>props.theme.pink};
  }
`;

export default CanvasSectionStyle;
