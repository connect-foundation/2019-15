import { useContext, useState, useRef } from 'react';
import GlobalContext from 'global.context';

export default function useSelect(selectType) {
  const [value, setValue] = useState(null);
  const selectRef = useRef(null);
  const { gameSocket } = useContext(GlobalContext);

  function onChange(e) {
    setValue(e.target.value);
    gameSocket.emit('changeRoomSetting', {
      selectType,
      selectedIndex: e.target.selectedIndex,
    });
  }

  function changeSelectValue(selectedIndex) {
    const opts = selectRef.current.options;
    opts.selectedIndex = selectedIndex;
  }

  return [value, onChange, selectRef, changeSelectValue];
}
