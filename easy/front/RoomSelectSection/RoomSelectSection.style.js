// 스타일드 컴포넌트를 사용했는데 거의 매번 새로운 컴포넌트를 생성하는것 같습니다.
// 재사용성을 높이고 싶은데 공통속성 컴포넌트를 밖으로 빼고 상속하여 사용하는게 맞는걸까요?

import styled from "styled-components";

const MAIN_COMPONENT_HEIGHT = "50rem";

const RoomSelectSectionStyle = styled.div`
  width: 100%;
  height: ${MAIN_COMPONENT_HEIGHT};
  background-color: ${props => props.theme.bodyColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default RoomSelectSectionStyle;
