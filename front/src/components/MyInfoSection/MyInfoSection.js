import React from 'react';
import MyInfoSectionStyle from './MyInfoSection.style';
import CurrentMyInfo from './CurrentMyInfo/CurrentMyInfo';
import ChangeMyInfo from './ChangeMyInfo/ChangeMyInfo';
import InnerSection from '../globalComponents/ContentSection/InnerSection/InnerSection';

export default function MyInfoSection() {
  return (
    <>
      <InnerSection title="현재 정보">
        <MyInfoSectionStyle id="MyInfoSection">
          <CurrentMyInfo />
        </MyInfoSectionStyle>
      </InnerSection>

      <InnerSection title="정보 변경">
        <ChangeMyInfo />
      </InnerSection>
    </>
  );
}
