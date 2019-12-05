import React, { useState, useEffect, useContext } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { faMinusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { findFriends } from 'queries/friend';
import FriendsSectionContext from 'components/FriendsSection/FriendsSection.context';
import FriendComponentStyle from '../FriendComponent.style';
import { IconStyle, CircleStyle } from '../Icons.style';

FriendComponents.propTypes = {
  modalOnOff: PropTypes.func,
  configMode: PropTypes.bool,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
};

FriendComponents.defaultProps = {
  modalOnOff: null,
  configMode: null,
  refresh: null,
  setRefresh: null,
};

export default function FriendComponents({
  modalOnOff,
  configMode,
  refresh,
  setRefresh,
}) {
  const { onlineFriends } = useContext(FriendsSectionContext);
  const [findFriendsFunc] = useMutation(findFriends);
  const [data, setData] = useState({ friends: [{ nickname: null }] });

  const fetchItems = async () => {
    const newItems = await findFriendsFunc();
    await setData(newItems.data);
  };
  useEffect(() => {
    if (refresh) {
      fetchItems();
      setRefresh(false);
    }
  });

  return (
    <>
      {data.friends.map((friend) => (
        <FriendComponentStyle key={friend.nickname}>
          <span>{friend.nickname}</span>
          {onlineFriends.some(
            (onlineFriend) => onlineFriend.id === friend.id,
          ) ? (
            <CircleStyle icon={faCircle} />
          ) : null}
          {configMode ? (
            <IconStyle
              icon={faMinusCircle}
              onClick={() => modalOnOff('delete', friend.nickname)}
            />
          ) : null}
        </FriendComponentStyle>
      ))}
    </>
  );
}
