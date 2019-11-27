import React from 'react';
import PropTypes from 'prop-types';
import RoomContainerStyle from './RoomContainer.style';
import Title from './Title/Title';
import ButtonContainer from './ButtonContainer/ButtonContainer';

function RoomContainer({ text, buttons }) {
  return (
    <RoomContainerStyle id={'RoomContainer'}>
      <Title text={text} />
      <ButtonContainer buttons={buttons} />
    </RoomContainerStyle>
  );
}

RoomContainer.propTypes = {
  text: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default RoomContainer;
