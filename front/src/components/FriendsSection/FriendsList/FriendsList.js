import React from 'react';
import { useState, useEffect } from 'react';
import FriendsListStyle from './FriendsList.style';

const FriendsList = (props) => {
  return (
    <>
      <FriendsListStyle isVisible={props.isVisible} />
    </>
  );
};

export default FriendsList;
