import { useContext } from 'react';
import { DELETE_FRIEND } from 'queries/friend';
import { useMutation } from '@apollo/react-hooks';
import { SEND_FRIEND_REQUEST } from 'queries/beforeFriend';
import GlobalContext from 'global.context';

export default function useFriendModal({
  modalContent,
  dispatchModalContent,
  refetch,
}) {
  const { onlineSocket, user } = useContext(GlobalContext);

  const [deleteFriendRequest] = useMutation(DELETE_FRIEND, {
    onCompleted({ deleteFriend }) {
      onlineSocket.emit('deleteFriend', deleteFriend);
      dispatchModalContent({
        type: 'deleteDone',
        nickname: modalContent.nickname,
      });
      refetch();
    },
    onError() {
      dispatchModalContent({
        type: 'error',
        content: '에러가 발생했습니다.',
      });
    },
  });

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    onCompleted({ sendFriendRequest: friend }) {
      onlineSocket.emit('alarm', {
        user: friend,
        message: `${user.nickname}님이 친구가 되고 싶어해요`,
      });
      dispatchModalContent({
        type: 'addDone',
        nickname: friend.nickname,
      });
    },
    onError({ graphQLErrors }) {
      dispatchModalContent({
        type: 'error',
        content: graphQLErrors[0].message,
      });
    },
  });

  const clearModalContent = () => {
    dispatchModalContent({ type: 'clear' });
  };

  const clickOKButton = () => {
    switch (modalContent.current) {
      case 'addDone':
      case 'deleteDone':
      case 'error':
        return dispatchModalContent({ type: 'clear' });
      case 'addRequest':
        return sendFriendRequest({
          variables: { nickname: modalContent.nickname },
        });
      case 'deleteRequest':
        return deleteFriendRequest({
          variables: { id: modalContent.id },
        });
      default:
        throw new Error(`${modalContent.current}cannot find current`);
    }
  };

  return [clearModalContent, clickOKButton];
}
