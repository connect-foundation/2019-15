import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/globalComponents/Select/Select';
import timerConfig from 'constants/timerConfig';

TimeSetting.propTypes = {
  onChangeTimer: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  timerRef: PropTypes.shape(useRef).isRequired,
  defaultOption: PropTypes.string.isRequired,
};

export default function TimeSetting({
  onChangeTimer,
  disabled,
  timerRef,
  defaultOption,
}) {
  const timerOptions = timerConfig.timerOption.map((time) => {
    return { value: time.toString(), text: time.toString() };
  });
  return (
    <>
      {'게임 시간'}
      <Select
        disabled={disabled}
        option={timerOptions}
        defaultOption={defaultOption}
        onChangeSelect={onChangeTimer}
        reference={timerRef}
      />
    </>
  );
}
