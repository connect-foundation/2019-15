import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import GlobalContext from 'global.context';
import SpectreButton from 'components/globalComponents/SpectreButton/SpectreButton';
import { changeNicknameMutation as changeNicknameQuery } from 'queries/user';

NicknameChangeBtn.propTypes = {
  newNickname: PropTypes.string.isRequired,
  setResultText: PropTypes.func,
  disabled: PropTypes.bool,
};

NicknameChangeBtn.defaultProps = {
  setResultText: () => {},
  disabled: false,
};

export default function NicknameChangeBtn({
  newNickname,
  setResultText,
  disabled,
}) {
  const { userDispatch } = useContext(GlobalContext);
  const [changeNickname, { loading, error }] = useMutation(
    changeNicknameQuery,
    {
      onCompleted({ changeNickname: { nickname, result } }) {
        if (!result) {
          setResultText(`"${nickname}" 닉네임은 사용이 불가능합니다`);
          return;
        }
        setResultText(`"${nickname}"닉네임으로 변경완료!`);
        userDispatch({ nickname });
      },
    },
  );
  if (error) {
    setResultText('에러가 발생하였습니다.');
  }

  const changeNicknameByClick = () => {
    changeNickname({
      variables: {
        nickname: newNickname,
      },
    });
  };
  return (
    <SpectreButton
      onClick={changeNicknameByClick}
      loading={loading}
      disabled={disabled}
    >
      저장
    </SpectreButton>
  );
}
