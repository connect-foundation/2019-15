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

  function inputChangeHandler(e) {
    setValue(e.target.value);
  }

  async function pressKeyHandler(e) {
    const { nickname } = user;
    const { roomType, roomId } = room;

    if (e.key === 'Enter') {
      await io.sendMessage({ nickname, roomType, roomId, inputValue });
      setValue('');
    }
  }

  return (
    <ChattingStyle>
      <ChattingList>{message}</ChattingList>
      <TextInput
        value={inputValue}
        onChange={inputChangeHandler}
        onKeyPress={pressKeyHandler}
      />
    </ChattingStyle>
  );
};

export default Chatting;
