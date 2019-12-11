import React from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import PENCIL from 'asset/pencil.png';
import {
  UserStyle,
  UserInfoStyle,
  UserImage,
  UserNickName,
  Text,
  Drawer,
  Score,
  Ranking,
} from './User.style';

User.defaultProps = {
  className: '',
};

User.propTypes = {
  className: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  privileged: PropTypes.bool.isRequired,
};

export default function User({ className, nickname, index, privileged }) {
  const drawer = className.split('painter').length > 1;

  return (
    <UserStyle className={className} privileged={privileged}>
      <UserImage
        src={`${faker.image.animals(parseInt(Math.random() * 1000, 0))}`}
        alt="avatar"
      />
      <UserInfoStyle>
        <UserNickName>
          <Ranking>#{index}</Ranking>
          <Text>{nickname}</Text>
          <Drawer drawer={drawer} src={PENCIL} />
        </UserNickName>
        <Score>1200</Score>
        <small>그리는 순서가 n 차례 남았습니다.</small>
      </UserInfoStyle>
    </UserStyle>
  );
}
