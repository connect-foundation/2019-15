import React from 'react';
import FriendComponentStyle from './FriendComponent.style';

const FriendComponent = props => {
  return (
    <FriendComponentStyle>{props.children}</FriendComponentStyle>
  );
}
export default FriendComponent;
