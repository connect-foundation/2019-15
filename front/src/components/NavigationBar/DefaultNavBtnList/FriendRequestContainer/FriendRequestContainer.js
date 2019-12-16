import React, { useEffect } from 'react';
import Alarm from 'components/NavigationBar/DefaultNavBtnList/FriendRequestContainer/Alarm';
import FriendRequestList from 'components/NavigationBar/DefaultNavBtnList/FriendRequestContainer/FriendRequestList/FriendRequestList';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NavImageStyle } from 'components/NavigationBar/DefaultNavBtnList/DefaultNavBtnList.style';
import useAlarm from 'hooks/Alarm/useAlarm';
import { FriendRequestContainerStyle } from 'components/NavigationBar/DefaultNavBtnList/FriendRequestContainer/FriendRequestContainer.style';
import useCloseClicker from 'hooks/useCloseClicker';
import useNotice from 'hooks/Alarm/useNotice';

export default function FriendRequestContainer() {
  const [alarmList, alarmListDispatch] = useAlarm();
  const [notice, noticeDispatch] = useNotice();

  let FriendRequestElement = null;
  if (notice.isOpen) {
    FriendRequestElement =
      notice.type === 'alarm' ? (
        <Alarm alarmList={alarmList} />
      ) : (
        <FriendRequestList />
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
    <FriendRequestContainerStyle ref={closeClicker}>
      <NavImageStyle icon={faBell} onClick={openMessages} />
      {FriendRequestElement}
    </FriendRequestContainerStyle>
  );
}
