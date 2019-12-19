import React, { useCallback, useContext, useReducer, useState } from 'react';
import Avatar from 'components/Avatar/Avatar';
import useCarousel from 'hooks/commons/useCarousel';
import { useMutation } from '@apollo/react-hooks';
import { CHANGE_AVATAR as changeAvatarQuery } from 'queries/user';
import GlobalContext from 'global.context';
import SpectreButton from 'components/globalComponents/SpectreButton/SpectreButton';
import AVATAR_NUMBER from 'constants/avatar';
import ChangeAvatarStyle from './ChangeAvatar.style';

const btnTextReducer = (state, action) => {
  switch (action) {
    case 'success': {
      return '완료';
    }
    case 'base': {
      return '저장';
    }
    default:
      throw new Error();
  }
};

export default function ChangeAvatar() {
  const { user, userDispatch } = useContext(GlobalContext);
  const [disabled, setDisabled] = useState(false);
  const [btnText, btnTextDispatch] = useReducer(btnTextReducer, '저장');
  const [selectedAvatar, clickLeftBtn, clickRightBtn] = useCarousel(
    AVATAR_NUMBER,
    user.avatar,
  );

  const onCompleted = ({ changeAvatar: { avatar, result } }) => {
    if (!result) return;
    userDispatch({ avatar });
    setDisabled(false);
    btnTextDispatch('success');

    setTimeout(() => {
      btnTextDispatch('base');
    }, 2000);
  };

  const [changeAvatar, { loading }] = useMutation(changeAvatarQuery, {
    onCompleted,
  });

  const changeAvatarByClick = useCallback(() => {
    if (user.avatar === selectedAvatar) return;
    changeAvatar({
      variables: {
        nickname: user.nickname,
        avatar: selectedAvatar,
      },
    });
    setDisabled(true);
  }, [changeAvatar, selectedAvatar, user.avatar, user.nickname]);

  return (
    <ChangeAvatarStyle>
      <Avatar
        avatar={selectedAvatar}
        clickLeftBtn={clickLeftBtn}
        clickRightBtn={clickRightBtn}
      />
      <SpectreButton
        onClick={changeAvatarByClick}
        loading={loading}
        disabled={disabled}
      >
        {btnText}
      </SpectreButton>
    </ChangeAvatarStyle>
  );
}
