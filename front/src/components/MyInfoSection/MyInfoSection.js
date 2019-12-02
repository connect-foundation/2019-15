import React from 'react';
import MyInfoSectionStyle from './MyInfoSection.style';
import CurrentMyInfo from './CurrentMyInfo/CurrentMyInfo';
import ChangeMyInfo from './ChangeMyInfo/ChangeMyInfo';
import ContentSection from '../globalComponents/ContentSection/ContentSection';

export default function MyInfoSection() {
  return (
    <>
      <ContentSection title="현재 정보">
        <MyInfoSectionStyle id="MyInfoSection">
          <CurrentMyInfo />
        </MyInfoSectionStyle>
      </ContentSection>

      <ContentSection title="정보 변경">
        <ChangeMyInfo />
      </ContentSection>
    </>
  );
}
