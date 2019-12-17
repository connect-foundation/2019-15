import React, { useEffect, useContext, useState } from 'react';
import SpectreButton from 'components/globalComponents/SpectreButton/SpectreButton';
import PropTypes from 'prop-types';
import { faCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import { INVITE } from 'queries/invitation';
import { useMutation } from '@apollo/react-hooks';
import GlobalContext from 'global.context';
import { CircleStyle } from 'components/FriendsSection/refactor/FriendList/Component/Component.style';
import { FriendStyle, NicknameStyle, PlayIconStyle } from './Friend.style';

Friend.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
};

export default function Friend({ id, nickname, online }) {
  const { room, onlineSocket } = useContext(GlobalContext);

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(!online);
  }, [online]);

  const [invite] = useMutation(INVITE, {
    onCompleted: () => {
      setDisabled(true);
      if (onlineSocket) {
        onlineSocket.emit('alarm', {
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
      <CircleStyle icon={faCircle} isonline={online ? 1 : 0} />
      <NicknameStyle>{nickname}</NicknameStyle>
      <SpectreButton onClick={sendInvitation} disabled={disabled}>
        <PlayIconStyle icon={faPlay} />
      </SpectreButton>
    </FriendStyle>
  );
}
