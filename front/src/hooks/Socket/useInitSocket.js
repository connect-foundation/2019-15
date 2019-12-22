import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import APP_URI from 'constants/uri';
import socketOptions from 'config/socket';

export default function useInitSocket(path) {
  const [onlineSocket, setOnlineSocket] = useState(null);

  useEffect(() => {
    const newOnlineSocket = socketIo.connect(
      `${APP_URI.REACT_APP_API_URI}${path}`,
      socketOptions,
    );
    setOnlineSocket(newOnlineSocket);
  }, [path]);

  return [onlineSocket, setOnlineSocket];
}
