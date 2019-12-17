import React from 'react';
import PropTypes from 'prop-types';
import CharacterStyle from 'components/globalComponents/Character/Character.sytle';

Character.propTypes = {
  src: PropTypes.string,
};

Character.defaultProps = {
  src: null,
};
// deprecated ?
export default function Character({ src }) {
  return <CharacterStyle id="Character" src={src} />;
}
