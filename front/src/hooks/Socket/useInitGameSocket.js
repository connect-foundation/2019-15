import { useContext } from 'react';
import GlobalContext from 'global.context';
import socketIo from 'socket.io-client';
import socketOptions from 'config/socket';
import APP_URI from '../../util/uri';

export default function useInitGameSocket() {
  const { gameSocket, setGameSocket } = useContext(GlobalContext);

  if (!gameSocket) {
    const socket = socketIo.connect(
      `${APP_URI.REACT_APP_API_URI}/game`,
      socketOptions,
    );
    setGameSocket(socket);
    return socket;
  }
  return gameSocket;
}
