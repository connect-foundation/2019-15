import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChattingListStyle from './ChattingList.style';
import Div from './Div.style';

ChattingList.propTypes = {
  children: PropTypes.node,
};

ChattingList.defaultProps = {
  children: null,
};

function ChattingList({ children }) {
  const scrollRef = useRef(null);
  const [history, setHistory] = useState({ messages: [] });

  useEffect(() => {
    if (!children) return;
    const splitRes = children.split(' : ');
    if (splitRes.length === 2 && splitRes[1] === '') return;
    history.messages.push(children);
    setHistory({ messages: history.messages });
    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
  }, [children, history.messages]);

  return (
    <ChattingListStyle ref={scrollRef}>
      {history.messages.map((value, idx) => {
        const order = idx + 1;
        return (
          <Div key={order} order={order}>
            {value}
          </Div>
        );
      })}
    </ChattingListStyle>
  );
}

export default ChattingList;
