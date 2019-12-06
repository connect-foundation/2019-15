import { useConetext } from "react";
import GlobalContext from "global.context";
import { connectGameSocket } from "logics/socketLogic";

/*
review: 항상 안전하게 연결된 소켓을 얻고 싶어서 이런식으로 훅을 만들었는데 
제대로 동작을 하지 않습니다. 아래 훅은 분명 GlobalContext 내의 컴포넌트에서 사용해서
useContext를 하는 곳은 문제가 없어 보입니다.
제 생각에는 setGameSocket 이 이미 불러온 gameSocket 엥향을 주지 않는 것으로 보이는데
문제가 뭔지 궁금합니다.
*/
const useGameSocket = () => {
  const { gameSocket, setGameSocket } = useContext(GlobalContext);

  if (!gameSocket || gameSocket.disconnected) {
    const socket = connectGameSocket();
    console.log(socket); // 정상
    setGameSocket(socket);
  }
  console.log(gameSocket); // 실패 null
  return [gameSocket];
};

export default useGameSocket;
