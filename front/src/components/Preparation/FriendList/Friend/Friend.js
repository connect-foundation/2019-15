import React, { useContext, useState } from 'react';
import SpectreButton from 'components/globalComponents/SpectreButton/SpectreButton';
import PropTypes from 'prop-types';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { INVITE } from 'queries/invitation';
import { useMutation } from '@apollo/react-hooks';
import GlobalContext from 'global.context';
import { emitAlarm } from 'logics/socketLogic/online';
import { FriendStyle, PlayIconStyle } from './Friend.style';

Friend.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
};

export default function Friend({ id, nickname }) {
  const { room, onlineSocket } = useContext(GlobalContext);

  const [disabled, setDisabled] = useState(false);
  const [invite] = useMutation(INVITE, {
    onCompleted: () => {
      setDisabled(true);
      if (onlineSocket) {
        emitAlarm(onlineSocket, {
          user: { id, nickname },
          message: `${nickname}님이 게임에 초대하였습니다.`,
        });
      }
    },
  });
  const sendInvitation = () => {
    invite({
      variables: {
        id,
        roomId: room.roomId,
      },
    });
  };
  return (
    <FriendStyle>
      <span>{nickname}</span>
      <SpectreButton onClick={sendInvitation} disabled={disabled}>
        <PlayIconStyle icon={faPlay} />
      </SpectreButton>
    </FriendStyle>
  );
}
