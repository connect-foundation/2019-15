import React from 'react';
import { NavImageStyle } from 'components/NavigationBar/DefaultNavBtnContainer/DefaultNavBtnContainer.style';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { NoticeStyle } from 'components/NavigationBar/DefaultNavBtnContainer/Notice/Notice.style';
import MessageList from 'components/NavigationBar/DefaultNavBtnContainer/Invitation/MessageList';
import useCloseClicker from 'hooks/useCloseClicker';
import useNotice from 'hooks/Alarm/useNotice';
import useAlarm from 'hooks/Alarm/useAlarm';
import Alarm from 'components/NavigationBar/DefaultNavBtnContainer/Notice/Alarm';

export default function Invitation() {
  const [alarmList, alarmListDispatch] = useAlarm();
  const [notice, noticeDispatch] = useNotice();

  let invitationContent = null;
  if (notice.isOpen) {
    invitationContent =
      notice.type === 'alarm' ? (
        <Alarm alarmList={alarmList} />
      ) : (
        <MessageList />
      );
  }

  const openMessages = () => {
    noticeDispatch({ open: true, type: 'messages' });
  };

  const closeMessages = () => {
    noticeDispatch({ open: false, type: 'messages' });
  };

  const closeClicker = useCloseClicker(closeMessages);

  return (
    <NoticeStyle ref={closeClicker}>
      <NavImageStyle icon={faGamepad} onClick={openMessages} />
      {invitationContent}
    </NoticeStyle>
  );
}
