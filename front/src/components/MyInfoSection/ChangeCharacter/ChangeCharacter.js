import React, { useCallback, useContext, useReducer } from 'react';
import Avatar from 'components/Avatar/Avatar';
import useCarousel from 'hooks/Carousel/useCarousel';
import { useMutation } from '@apollo/react-hooks';
import { CHANGE_AVATAR as changeAvatarQuery } from 'queries/user';
import GlobalContext from 'global.context';
import SpectreButton from 'components/globalComponents/SpectreButton/SpectreButton';
import AVATAR_NUMBER from 'constant/avatar';
import ChangeCharacterStyle from './ChangeCharacter.style';

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

const ChangeCharacter = () => {
  const { user, userDispatch } = useContext(GlobalContext);
  const [btnText, btnTextDispatch] = useReducer(btnTextReducer, '저장');
  const [selectedAvatar, clickLeftBtn, clickRightBtn] = useCarousel(
    AVATAR_NUMBER,
    user.avatar,
  );

  const onCompleted = ({ changeAvatar: { avatar, result } }) => {
    if (!result) return;
    const newUser = { ...user };
    userDispatch(newUser, avatar);
    btnTextDispatch('success');
    setTimeout(() => {
      btnTextDispatch('base');
    }, 2000);
  };

  const [changeAvatar, { loading, error }] = useMutation(changeAvatarQuery, {
    onCompleted,
  });

  const changeAvatarByClick = useCallback(() => {
    changeAvatar({
      variables: {
        nickname: user.nickname,
        avatar: selectedAvatar,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeAvatar, selectedAvatar]);

  return (
    <ChangeCharacterStyle>
      <Avatar
        avatar={selectedAvatar}
        clickLeftBtn={clickLeftBtn}
        clickRightBtn={clickRightBtn}
      />
      <SpectreButton onClick={changeAvatarByClick} loading={loading}>
        {btnText}
      </SpectreButton>
    </ChangeCharacterStyle>
  );
};

export default ChangeCharacter;
