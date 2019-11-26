import React, { useContext, useState, useEffect } from 'react';
import ChattingStyle from './Chatting.style';
import ChattingList from './ChattingList/ChattingList';
import TextInput from './TextInput.style';
import GlobalContext from '../../global.context';

const Chatting = () => {
  const { io, user, room } = useContext(GlobalContext);
  const [message, setMessage] = useState(null);
  const [inputValue, setValue] = useState('');

  useEffect(() => {
    const initSocket = async () => {
      await io.initChattingHandler({ setMessage });
    };
    initSocket();
  }, [io]);

  async function sendMessage() {
    const { nickname } = user;
    const { roomId } = room;
    await io.sendMessage({ nickname, roomId, inputValue });
  }

  function inputChangeHandler(e) {
    setValue(e.target.value);
  }

  return (
    <ChattingStyle>
      <ChattingList>{message}</ChattingList>
      <TextInput onChange={inputChangeHandler} />
      <button type="button" onClick={sendMessage}>
        emit
      </button>
    </ChattingStyle>
  );
};

export default Chatting;
