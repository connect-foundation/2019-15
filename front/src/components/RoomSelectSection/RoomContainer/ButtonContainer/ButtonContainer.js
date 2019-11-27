import React from 'react';
import PropTypes from 'prop-types';
import ButtonContainerStyle from './ButtonContainer.style';

const RoomContainerButtonContainer = ({ buttons }) => (
  <>
    <ButtonContainerStyle id="ButtonContainer">{buttons}</ButtonContainerStyle>
  </>
);

RoomContainerButtonContainer.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default RoomContainerButtonContainer;
