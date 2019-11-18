import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import friendQuery from '../../../../queries/friend';
import FriendComponentStyle from '../FriendComponent.style';
import Icon from '../Icons.style';

function FriendComponents({ modalOnOff, configMode }) {
  const { data, loading, error } = useQuery(friendQuery.findFriendsById, {
    variables: { id: 4 },
  });
  if (loading) return <p>Loading </p>;
  if (error) return <p>ERROR</p>;

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
};

FriendComponents.defaultProps = {
  modalOnOff: null,
  configMode: null,
};
