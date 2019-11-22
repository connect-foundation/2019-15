import React from 'react';
import MyInfoSectionStyle from './MyInfoSection.style';
import CurrentMyInfo from "./CurrentMyInfo/CurrentMyInfo";
import ChangeMyInfo from "./ChangeMyInfo/ChangeMyInfo";

const MyInfoSection = () => {
  return (
    <MyInfoSectionStyle id={'MyInfoSection'}>
        <CurrentMyInfo/>
        <ChangeMyInfo/>
    </MyInfoSectionStyle>
  );
};

export default MyInfoSection;
