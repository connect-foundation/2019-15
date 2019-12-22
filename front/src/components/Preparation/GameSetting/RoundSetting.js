import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/globalComponents/Select/Select';
import { roundOption } from 'constants/room/roomInfo';

RoundSetting.propTypes = {
  onChangeRound: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  roundRef: PropTypes.shape(useRef).isRequired,
  defaultOption: PropTypes.string.isRequired,
};

export default function RoundSetting({
  onChangeRound,
  disabled,
  roundRef,
  defaultOption,
}) {
  const roundOptions = roundOption.map((round) => {
    return { value: round.toString(), text: round.toString() };
  });
  return (
    <>
      {'라운드'}
      <Select
        disabled={disabled}
        optionList={roundOptions}
        defaultOption={defaultOption}
        onChangeSelect={onChangeRound}
        reference={roundRef}
      />
    </>
  );
}
