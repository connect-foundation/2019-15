// 컨테이너 재사용을 위해 퍼블릭룸과 프라이빗룸의 공통속성을 빼내고 내부 텍스트와 엘리먼트를 받도록 하였습니다.
// 맞는지 잘 모르겠습니다.

import React from "react";
import PropTypes from "prop-types";
import RoomContainerStyle from "./RoomContainer.style";
import Title from "./Title/Title";
import ButtonContainer from "./ButtonContainer/ButtonContainer";

function RoomContainer({ text, buttons }) {
  return (
    <RoomContainerStyle>
      <Title text={text} />
      <ButtonContainer buttons={buttons} />
    </RoomContainerStyle>
  );
}

RoomContainer.propTypes = {
  text: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RoomContainer;
