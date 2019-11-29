import React from 'react';
import {
  AnchorStyle,
  AnchorImageStyle,
  AnchorLinkText,
  AnchorCopyButton,
} from './Anchor.style';
import AnchorImage from '../../../asset/anchor.png';

const Anchor = () => {
  function onClickCopyButton() {
    const tempElem = document.createElement('textarea');
    tempElem.value = window.location.href;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand('copy');
    document.body.removeChild(tempElem);
  }
  return (
    <AnchorStyle>
      <AnchorImageStyle src={AnchorImage} />
      <AnchorLinkText id="link-url">{window.location.href}</AnchorLinkText>
      <AnchorCopyButton onClick={onClickCopyButton}>복사</AnchorCopyButton>
    </AnchorStyle>
  );
};

export default Anchor;
