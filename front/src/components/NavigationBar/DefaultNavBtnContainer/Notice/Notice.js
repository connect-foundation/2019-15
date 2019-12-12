import React, { useEffect } from 'react';
import Alarm from 'components/NavigationBar/DefaultNavBtnContainer/Notice/Alarm';
import MessageList from 'components/NavigationBar/DefaultNavBtnContainer/Notice/MessageList/MessageList';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NavImageStyle } from 'components/NavigationBar/DefaultNavBtnContainer/DefaultNavBtnContainer.style';
import useAlarm from 'hooks/Alarm/useAlarm';
import { NoticeStyle } from 'components/NavigationBar/DefaultNavBtnContainer/Notice/Notice.style';
import useCloseClicker from 'hooks/useCloseClicker';
import useNotice from 'hooks/Alarm/useNotice';

export default function Notice() {
  const [alarmList, alarmListDispatch] = useAlarm();
  const [notice, noticeDispatch] = useNotice();

  useEffect(() => {
    if (!alarmList.length) return () => {};

    noticeDispatch({ open: true, type: 'alarm' });
    const timeoutToCloseAlarm = setTimeout(() => {
      noticeDispatch({ open: false, type: 'alarm' });
      alarmListDispatch({ type: 'reset' });
    }, 2000);
    return () => {
      clearTimeout(timeoutToCloseAlarm);
    };
  }, [alarmList, alarmListDispatch, noticeDispatch]);

  let noticeElement = null;
  if (notice.isOpen) {
    noticeElement =
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
      <NavImageStyle icon={faBell} onClick={openMessages} />
      {noticeElement}
    </NoticeStyle>
  );
}
