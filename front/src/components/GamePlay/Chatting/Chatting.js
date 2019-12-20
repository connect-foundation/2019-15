import React from 'react';
import ChattingStyle from './Chatting.style';
import ChattingList from './ChattingList/ChattingList';
import TextInput from './TextInput/TextInput';

export default function Chatting() {
  return (
    <>
      <ChattingStyle>
        <ChattingList />
        <TextInput />
      </ChattingStyle>
    </>
  );
}
