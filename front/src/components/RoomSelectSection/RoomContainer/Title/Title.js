import React from 'react';
import PropTypes from 'prop-types';
import TitleStyle from './Title.style';

const RoomContainerTitle = ({ text }) => <TitleStyle>{text}</TitleStyle>;

RoomContainerTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default RoomContainerTitle;
