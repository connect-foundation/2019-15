import React from 'react';
import CurrentMyInfoStyle from './CurrentMyInfo.style';
import character1 from 'asset/character1.png';
import Character from 'components/globalComponents/Character/Character';

// 얘를 UserCard라는 이름의 컴포넌트로 리팱토링 해도 괜찮을듯?
// 게임 플레이 페이지에서 써먹을 수 있을지도..
const CurrentMyInfo = () => {
  return (
    <CurrentMyInfoStyle id="CurrentMyInfo">
      <Character alt="character" src={character1} />
      <div>
        <span className="user-card nickname">닉네임</span>
        <span className="user-card ranking">랭킹 xxx위</span>
      </div>
    </CurrentMyInfoStyle>
  );
};

export default CurrentMyInfo;
