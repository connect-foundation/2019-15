import React from 'react';
import PropTypes from 'prop-types';
import ButtonContainerStyle from './ButtonContainer.style';

RoomContainerButtonContainer.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default function RoomContainerButtonContainer({ buttons }) {
  return (
    <>
      <ButtonContainerStyle id="ButtonContainer">
        {buttons}
      </ButtonContainerStyle>
    </>
  );
}
