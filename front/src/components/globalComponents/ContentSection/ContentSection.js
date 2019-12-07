import React from 'react';
import PropTypes from 'prop-types';
import {
  ContentSectionStyle,
  ContentSectionTitleStyle,
} from './ContentSection.style';

ContentSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default function ContentSection({ title, children }) {
  return (
    <ContentSectionStyle id="ContentSection">
      <ContentSectionTitleStyle>{title}</ContentSectionTitleStyle>
      {children}
    </ContentSectionStyle>
  );
}
