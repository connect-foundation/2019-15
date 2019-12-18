import React, { useContext, useRef } from 'react';
import AnchorImage from 'asset/anchor.png';
import APP_URI from 'util/uri';
import GlobalContext from 'global.context';
import {
  AnchorStyle,
  AnchorImageStyle,
  AnchorLinkText,
  AnchorCopyButton,
  CopyTextArea,
} from './Anchor.style';

export default function Anchor() {
  const { room } = useContext(GlobalContext);
  const settingURL = `${APP_URI.REACT_APP_URI}/#/setting:${room.roomId}`;
  const textArea = useRef(null);

  function onClickCopyButton() {
    textArea.current.select();
    document.execCommand('copy');
  }
  return (
    <AnchorStyle>
      <AnchorImageStyle src={AnchorImage} />
      <AnchorLinkText id="link-url">{settingURL}</AnchorLinkText>
      <AnchorCopyButton onClick={onClickCopyButton}>복사</AnchorCopyButton>
      <CopyTextArea ref={textArea} defaultValue={settingURL} />
    </AnchorStyle>
  );
}
