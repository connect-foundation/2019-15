import React from 'react';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import friendQuery from '../../../../queries/friend';
import FriendComponentStyle from '../FriendComponent.style';
import Icon from '../Icons.style';

function FriendComponents({ modalOnOff, configMode, refresh, setRefresh }) {
  const [findFunc] = useMutation(friendQuery.findFriendsById);
  const [data, setData] = useState({ friends: [{ nickname: null }] });

  const fetchItems = async () => {
    const newItems = await findFunc({ variables: { id: 4 } });
    await setData(newItems.data);
  };

  useEffect(() => {
    if (refresh) {
      fetchItems();
    }
    setRefresh(false);
  });

  return (
    <>
      {data.friends.map((friend) => (
        <FriendComponentStyle key={friend.nickname}>
          {friend.nickname}
          {configMode ? (
            <Icon
              icon={faMinusCircle}
              onClick={() => modalOnOff('delete', friend.nickname)}
            />
          ) : null}
        </FriendComponentStyle>
      ))}
    </>
  );
}

export default FriendComponents;

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
