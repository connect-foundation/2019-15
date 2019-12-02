import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import RoomSelectSection from '../../components/RoomSelectSection/RoomSelectSection';
import FriendsSection from '../../components/FriendsSection/FriendsSection';
import Background from '../../components/globalComponents/Container/Background.style';
import Modal from '../../components/globalComponents/Modal/Modal';
import DivStyle from '../../components/globalComponents/Modal/ContentDiv.style';
import Button from '../../components/globalComponents/Button/Button';
import parseCookies from '../../util/cookie';

MainPage.propTypes = {
  nickName: PropTypes.bool.isRequired,
};

function MainPage({ nickName }) {
  const [isSignUp, setIsSignUp] = useState(
    parseCookies(document.cookie).isSignUp === 'true',
  );

  function closeModal() {
    setIsSignUp(false);
  }

  return (
    <>
      {isSignUp ? (
        <Modal>
          <DivStyle>
            <div>
              당신의 닉네임은 <strong>{nickName}</strong>입니다.
            </div>
            <div>
              <Button onClick={closeModal}>확인</Button>
            </div>
          </DivStyle>
        </Modal>
      ) : null}
      <NavigationBar />
      <Background id="MainPage">
        <RoomSelectSection />
        <FriendsSection />
      </Background>
    </>
  );
}

export default MainPage;
