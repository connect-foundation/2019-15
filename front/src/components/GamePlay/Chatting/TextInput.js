import React, { useContext, useState } from 'react';
import GlobalContext from 'global.context';
import { sendMessage } from 'logics/socketLogic';
import TextInputStyle from './TextInput.style';

export default function Chatting() {
  const { gameSocket, room } = useContext(GlobalContext);
  const [inputValue, setValue] = useState('');

  function inputChangeHandler(e) {
    setValue(e.target.value);
  }

  async function pressKeyHandler(e) {
    const { roomType, roomId } = room;

    if (e.key === 'Enter') {
      sendMessage(gameSocket, { roomType, roomId, inputValue });
      setValue('');
    }
  }

  return (
    <TextInputStyle
      value={inputValue}
      onChange={inputChangeHandler}
      onKeyPress={pressKeyHandler}
      onClick={(e) => e.target.focus()}
    />
  );
}
