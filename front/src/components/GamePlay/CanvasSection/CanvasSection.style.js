import styled from 'styled-components';

const CanvasSectionStyle = styled.div`
  position: relative;
  margin-top: 0.5rem;
  & > section {
    margin-top: 4rem;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 10px,
      rgba(0, 0, 0, 0.16) 0px 2px 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 750px;
    margin-left: 0.5rem;
    padding-left: 10px;
    background-color: ${(props) => props.theme.pink};
    border-radius: 0.5rem;
  }
`;

export default CanvasSectionStyle;
