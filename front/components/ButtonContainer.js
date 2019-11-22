import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ButtonContainerStyle, NavImage } from "./ButtonContainer.style";

import GlobalContext from "../../../global.context";
import APP_URI from "../../../util/uri";
import Button from "./Button/Button";
import NOTICE from "../../../asset/notice.png";
import MYPAGE from "../../../asset/mypage.png";
import LOGOUT from "../../../asset/logout.png";

import Messages from "../../Messages/Messages";

const ButtonContainer = () => {
  const [openNotice, setOpenNotice] = useState(false);
  const { room } = useContext(GlobalContext);

  // logics 로 분리예정
  function logout() {
    window.location.href = `${APP_URI.REACT_APP_API_URI}/auth/logout`;
  }

  function switchNotice() {
    setOpenNotice(cur => !cur);
  }
  // 이미지가 들어가는 버튼을 재사용하고 싶어 버튼컴포넌트가 컴포넌트를 인자로 받아 감싸진 컴포넌트를 반환하도록
  // 하였습니다. 재사용성이 너무 어려운것같은데 아래는 추천하지 않는 방법인가요?

  // 또 스타일과 컴포넌트 파일을 분리했는데 컴포넌트 파일에 스타일이 들어가도 될지 고민입니다.
  if (room.roomType === null) {
    return (
      <ButtonContainerStyle>
        {Button(<NavImage src={NOTICE} onClick={switchNotice} />)}
        {openNotice ? <Messages /> : null}

        {Button(
          <Link to="mypage">
            <NavImage src={MYPAGE} />
          </Link>
        )}
        {Button(<NavImage src={LOGOUT} onClick={logout} />)}
      </ButtonContainerStyle>
    );
  }

  return <></>;
};

export default ButtonContainer;
