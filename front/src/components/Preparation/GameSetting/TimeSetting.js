import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/globalComponents/Select/Select';
import timerConfig from 'constant/timerConfig';

TimeSetting.propTypes = {
  onChangeTimer: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  timerRef: PropTypes.any.isRequired,
};

export default function TimeSetting({ onChangeTimer, disabled, timerRef }) {
  return (
    <>
      {'게임 시간'}
      <Select
        disabled={disabled}
        option={timerConfig.timerOption}
        defaultOption={timerConfig.defaultExpireTime / 1000}
        onChangeSelect={onChangeTimer}
        reference={timerRef}
      />
    </>
  );
}
