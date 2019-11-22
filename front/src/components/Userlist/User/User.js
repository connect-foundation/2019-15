import React from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import {Drawer, Ranking, Score, Text, UserImage, UserInfoStyle, UserNickName, UserStyle,} from './User.style';
import PENCIL from '../../../asset/pencil.png';

const User = ({ nickname, index }) => {
  return (
    <UserStyle>
      <UserImage
        src={`${faker.image.animals(parseInt(Math.random() * 1000, 0))}`}
        alt="avatar"
      />
      <UserInfoStyle>
        <UserNickName>
          <Ranking>#{index}</Ranking>
          <Text>{nickname}</Text>
          <Drawer src={PENCIL} />
        </UserNickName>
        <Score>1200</Score>
        <div>그리는 순서가 n 차례 남았습니다.</div>
      </UserInfoStyle>
    </UserStyle>
  );
};

User.propTypes = {
  nickname: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default User;
