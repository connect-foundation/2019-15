import styled from 'styled-components';

const MAIN_COMPONENT_HEIGHT = '50rem';

const BackGroundStyle = styled.div`
  width: 100%;
  height: ${MAIN_COMPONENT_HEIGHT};
  background-color: ${(props) => props.theme.bodyColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default BackGroundStyle;
