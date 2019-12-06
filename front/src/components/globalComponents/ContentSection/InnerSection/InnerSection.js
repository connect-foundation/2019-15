import React from 'react';
import PropTypes from 'prop-types';
import {
  InnerSectionStyle,
  InnerSectionTitleStyle,
} from './InnerSection.style';

InnerSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default function InnerSection({ title, children }) {
  return (
    <InnerSectionStyle id="InnerSection">
      <InnerSectionTitleStyle>{title}</InnerSectionTitleStyle>
      {children}
    </InnerSectionStyle>
  );
}
