import { useContext } from 'react';
import {
  ACCEPT_FRIEND_REQUEST,
  DELETE_FRIEND_REQUEST,
} from 'queries/beforeFriend';
import { useMutation } from '@apollo/react-hooks';
import GlobalContext from 'global.context';

export default function useFriendRequest({ id, remove }) {
  const { onlineSocket } = useContext(GlobalContext);

  const [deleteFriendRequest] = useMutation(DELETE_FRIEND_REQUEST, {
    onCompleted() {
      remove();
    },
  });

  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST, {
    onCompleted({ acceptFriendRequest: friend }) {
      onlineSocket.emit('acceptFriendRequest', friend);
      remove();
    },
  });

  const acceptRequest = async () => {
    await acceptFriendRequest({ variables: { id } });
  };

  const declineRequest = async () => {
    await deleteFriendRequest({
      variables: { id },
    });
  };

  return [acceptRequest, declineRequest];
}
