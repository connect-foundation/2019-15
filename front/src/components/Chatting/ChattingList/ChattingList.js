import React, { useRef, useState, useEffect, useContext } from 'react';
import ChattingListStyle from './ChattingList.style';
import Div from './Div.style';
import GlobalContext from '../../../global.context';

function ChattingList() {
  const { io } = useContext(GlobalContext);

  const scrollRef = useRef(null);
  const [messages, pushMessage] = useState([]);
  const [init, setInit] = useState(true);

  useEffect(() => {
    const initSocket = async () => {
      await io.initChattingHandler({ messages, pushMessage });
    };
    if (init){
      setInit(false);
    initSocket();
    }

    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
  }, [io, messages, init]);

  return (
    <ChattingListStyle ref={scrollRef}>
      {messages.map((value, idx) => {
        const order = idx + 1;
        return (
          <Div key={order} order={order} privileged={value.privileged}>
            {value.content}
          </Div>
        );
      })}
    </ChattingListStyle>
  );
}

export default ChattingList;
