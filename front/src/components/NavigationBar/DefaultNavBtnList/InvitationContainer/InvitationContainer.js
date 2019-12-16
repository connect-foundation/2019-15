import React from 'react';
import { NavImageStyle } from 'components/NavigationBar/DefaultNavBtnList/DefaultNavBtnList.style';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FriendRequestContainerStyle } from 'components/NavigationBar/DefaultNavBtnList/FriendRequestContainer/FriendRequestContainer.style';
import InvitationList from 'components/NavigationBar/DefaultNavBtnList/InvitationContainer/InvitationList/InvitationList';
import useCloseClicker from 'hooks/useCloseClicker';
import useNotice from 'hooks/Alarm/useNotice';
import useAlarm from 'hooks/Alarm/useAlarm';
import Alarm from 'components/NavigationBar/DefaultNavBtnList/FriendRequestContainer/Alarm';

export default function InvitationContainer() {
  const [alarmList, alarmListDispatch] = useAlarm();
  const [notice, noticeDispatch] = useNotice();

  let invitationContent = null;
  if (notice.isOpen) {
    invitationContent =
      notice.type === 'alarm' ? (
        <Alarm alarmList={alarmList} />
      ) : (
        <InvitationList />
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
      <NavImageStyle icon={faGamepad} onClick={openMessages} />
      {invitationContent}
    </FriendRequestContainerStyle>
  );
}
