import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PENCIL from 'asset/pencil.png';
import {
  UserStyle,
  UserInfoStyle,
  UserNickName,
  Text,
  Drawer,
  Score,
  Ranking,
  UserImage,
} from './User.style';
import { getAvatar } from 'logics/avatar';

User.defaultProps = {
  className: '',
};

User.propTypes = {
  className: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  privileged: PropTypes.bool.isRequired,
  avatar: PropTypes.number.isRequired,
  drawer: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  leftTurn: PropTypes.number.isRequired,
};

export default function User({
  className,
  nickname,
  index,
  privileged,
  avatar,
  drawer,
  score,
  leftTurn,
}) {
  useEffect(() => {}, [leftTurn]);

  return (
    <UserStyle className={className} privileged={privileged}>
      <UserImage src={getAvatar(avatar)} />
      <UserInfoStyle>
        <UserNickName>
          <Ranking>#{index}</Ranking>
          <Text>{nickname}</Text>
          <Drawer drawer={drawer} src={PENCIL} />
        </UserNickName>
        <Score>{score}</Score>
        <small>그리는 순서가 {leftTurn} 차례 남았습니다.</small>
      </UserInfoStyle>
    </UserStyle>
  );
}
