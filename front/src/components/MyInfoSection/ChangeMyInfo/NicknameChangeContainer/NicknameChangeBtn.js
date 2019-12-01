import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import GlobalContext from 'global.context';
import SpectreButton from 'components/globalComponents/SpectreButton/SpectreButton';
import { changeNicknameMutation as changeNicknameQuery } from 'queries/user';

NicknameChangeBtn.propTypes = {
  newNickname: PropTypes.string.isRequired,
  resultTextDispatch: PropTypes.func,
  disabled: PropTypes.bool,
};

NicknameChangeBtn.defaultProps = {
  resultTextDispatch: () => {},
  disabled: false,
};

export default function NicknameChangeBtn({
  newNickname,
  resultTextDispatch,
  disabled,
}) {
  const { userDispatch } = useContext(GlobalContext);

  const onCompleted = ({ changeNickname: { nickname, result } }) => {
    if (!result) {
      resultTextDispatch({ type: 'notUsable', nickname });
      return;
    }
    resultTextDispatch({ type: 'completeChange', nickname });
    userDispatch({ nickname });
  };

  const [changeNickname, { loading, error }] = useMutation(
    changeNicknameQuery,
    {
      onCompleted,
    },
  );

  if (error) {
    resultTextDispatch({ type: 'error' });
  }

  const changeNicknameByClick = useCallback(() => {
    changeNickname({
      variables: {
        nickname: newNickname,
      },
    });
  }, [changeNickname, newNickname]);

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
