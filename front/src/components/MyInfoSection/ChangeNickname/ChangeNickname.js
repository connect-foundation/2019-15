import React, { useState } from 'react';

const ChangeNickname = () => {
  const [newNickname, setNewNickname] = useState('');

  function changeEventHandler(e) {
    setNewNickname(e.target.value);
  }

  return (
    <>
      <input
        type="text"
        placeholder="변경할 닉네임"
        onChange={changeEventHandler}
      />
      <button type="button">저장</button>
    </>
  );
};

export default ChangeNickname;
