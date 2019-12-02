import React from 'react';
import PropTypes from 'prop-types';
import TitleStyle from './Title.style';

RoomContainerTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default function RoomContainerTitle({ text }) {
  return <TitleStyle>{text}</TitleStyle>;
}
