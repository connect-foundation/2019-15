import React from 'react';
import PropTypes from 'prop-types';
import {
  ContentSectionStyle,
  ContentSectionTitleStyle,
} from './ContentSection.style';

const ContentSection = ({ title, children }) => {
  return (
    <ContentSectionStyle id="ContentSection">
      <ContentSectionTitleStyle>{title}</ContentSectionTitleStyle>
      {children}
    </ContentSectionStyle>
  );
};

ContentSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ContentSection;
