import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/globalComponents/Select/Select';
import { roundOption } from 'constant/room/roomInfo';

RoundSetting.propTypes = {
  onChangeRound: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  roundRef: PropTypes.any.isRequired,
};

export default function RoundSetting({ onChangeRound, disabled, roundRef }) {
  return (
    <>
      {'라운드'}
      <Select
        disabled={disabled}
        option={roundOption}
        defaultOption={3}
        onChangeSelect={onChangeRound}
        reference={roundRef}
      />
    </>
  );
}
