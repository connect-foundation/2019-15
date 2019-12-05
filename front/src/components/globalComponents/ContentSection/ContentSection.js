import React from 'react';
import PropTypes from 'prop-types';
import {
  ContentSectionStyle,
  ContentSectionTitleStyle,
} from './ContentSection.style';

ContentSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
};

ContentSection.defaultProps = {
  height: '33rem',
  width: '20rem',
};

export default function ContentSection({ title, children, height, width }) {
  return (
    <ContentSectionStyle id="ContentSection" height={height} width={width}>
      <ContentSectionTitleStyle>{title}</ContentSectionTitleStyle>
      {children}
    </ContentSectionStyle>
  );
}
