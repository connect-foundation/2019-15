import React from 'react';
import AnchorImage from 'asset/anchor.png';
import {
  AnchorStyle,
  AnchorImageStyle,
  AnchorLinkText,
  AnchorCopyButton,
} from './Anchor.style';

export default function Anchor() {
  function onClickCopyButton() {
    const tempElem = document.createElement('textarea');
    tempElem.value = window.location.href.replace('waiting', 'setting');
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand('copy');
    document.body.removeChild(tempElem);
  }
  return (
    <AnchorStyle>
      <AnchorImageStyle src={AnchorImage} />
      <AnchorLinkText id="link-url">
        {window.location.href.replace('waiting', 'setting')}
      </AnchorLinkText>
      <AnchorCopyButton onClick={onClickCopyButton}>복사</AnchorCopyButton>
    </AnchorStyle>
  );
}
