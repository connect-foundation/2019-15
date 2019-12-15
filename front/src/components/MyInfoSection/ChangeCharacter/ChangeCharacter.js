import React from 'react';
import Avatar from 'components/Avatar/Avatar';
import useCarousel from 'hooks/Carousel/useCarousel';
import ChangeCharacterStyle from './ChangeCharacter.style';

const ChangeCharacter = () => {
  const [avatar, clickLeftBtn, clickRightBtn] = useCarousel(3);

  return (
    <ChangeCharacterStyle>
      <Avatar
        avatar={avatar}
        clickLeftBtn={clickLeftBtn}
        clickRightBtn={clickRightBtn}
      />
    </ChangeCharacterStyle>
  );
};

export default ChangeCharacter;
