import React from 'react';
import PropTypes from 'prop-types';
import { GameInfoStyle, Text } from './GameInfo.style';

GameInfo.propTypes = {
  round: PropTypes.shape({
    currentRound: PropTypes.number.isRequired,
    totalRound: PropTypes.number.isRequired,
  }).isRequired,
};

export default function GameInfo({ round }) {
  return (
    <GameInfoStyle>
      <Text>
        Round {round.currentRound} of {round.totalRound}
      </Text>
    </GameInfoStyle>
  );
}
