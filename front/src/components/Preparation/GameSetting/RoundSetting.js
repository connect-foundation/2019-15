import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/globalComponents/Select/Select';
import { roundOption } from 'constant/room/roomInfo';

RoundSetting.propTypes = {
  onChangeRound: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  roundRef: PropTypes.shape(useRef).isRequired,
};

export default function RoundSetting({ onChangeRound, disabled, roundRef }) {
  const roundOptions = roundOption.map((round) => {
    return { value: round.toString(), text: round.toString() };
  });
  return (
    <>
      {'라운드'}
      <Select
        disabled={disabled}
        option={roundOptions}
        defaultOption="3"
        onChangeSelect={onChangeRound}
        reference={roundRef}
      />
    </>
  );
}
