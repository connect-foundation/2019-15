import React, { useContext, useState } from 'react';
import GlobalContext from 'global.context';
import TextInputStyle from './TextInput.style';

export default function Chatting() {
  const { gameSocket } = useContext(GlobalContext);
  const [inputValue, setValue] = useState('');

  const inputChangeHandler = (e) => {
    if (e.target.value.length < 50) setValue(e.target.value);
  };

  const pressKeyHandler = async (e) => {
    if (e.key === 'Enter') {
      gameSocket.emit('sendMessage', { inputValue });
      setValue('');
    }
  };

  return (
    <TextInputStyle
      value={inputValue}
      onChange={inputChangeHandler}
      onKeyPress={pressKeyHandler}
      onClick={(e) => e.target.focus()}
    />
  );
}
