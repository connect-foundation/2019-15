import React, { useContext } from 'react';
import AnchorImage from 'asset/anchor.png';
import APP_URI from 'util/uri';
import GlobalContext from 'global.context';
import {
  AnchorStyle,
  AnchorImageStyle,
  AnchorLinkText,
  AnchorCopyButton,
} from './Anchor.style';

export default function Anchor() {
  const { room } = useContext(GlobalContext);
  const settingURL = `${APP_URI.REACT_APP_URI}/#/setting:${room.roomId}`;
  function onClickCopyButton() {
    const tempElem = document.createElement('textarea');
    tempElem.value = settingURL;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand('copy');
    document.body.removeChild(tempElem);
  }
  return (
    <AnchorStyle>
      <AnchorImageStyle src={AnchorImage} />
      <AnchorLinkText id="link-url">{settingURL}</AnchorLinkText>
      <AnchorCopyButton onClick={onClickCopyButton}>복사</AnchorCopyButton>
    </AnchorStyle>
  );
}
