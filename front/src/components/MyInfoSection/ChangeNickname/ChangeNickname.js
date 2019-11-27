import React, {useState} from 'react';

const ChangeNickname = () => {
  const [newNickname, setNewNickname] = useState();

  function changeEventHandler(e) {
      setNewNickname(e.target.value);
  }

  return (
    <>
      <input type={'text'} onChange={changeEventHandler} />
        <button>저장</button>
    </>
  );
};

export default ChangeNickname;
