import React, { useRef, useEffect } from 'react';
import useChatting from 'hooks/Chatting/useChatting';
import ChattingListStyle from './ChattingList.style';
import Div from './Div.style';

export default function ChattingList() {
  const scrollRef = useRef(null);
  const messages = useChatting();

  useEffect(() => {
    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
  }, [messages]);

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
