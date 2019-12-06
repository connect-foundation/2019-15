import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import getRandomWords from 'queries/word';
import GlobalContext from 'global.context';
import { selectWord } from 'logics/socketLogic';
import Background from './Background.style';
import WordSet from './WordSet.style';
import { WordCard, P } from './WordCard.style';

WordChoice.propTypes = {
  setSelectedWord: PropTypes.func.isRequired,
};

function WordChoice({ setSelectedWord }) {
  const { gameSocket, room } = useContext(GlobalContext);
  const [open, setOpen] = useState(true);
  const { data, loading, error } = useQuery(getRandomWords);

  if (loading) {
    return <></>;
  }
  if (error) {
    return 'error';
  }

  async function close(e) {
    setOpen(false);
    const { roomType, roomId } = room;
    const answer = e.target.textContent;
    setSelectedWord(answer);
    selectWord(gameSocket, { answer, roomType, roomId });
  }

  return (
    <>
      {open ? (
        <Background>
          <WordSet>
            {data.getRandomWords.map((word) => (
              <WordCard key={word.id}>
                <P onClick={(e) => close(e)}>{word.word}</P>
              </WordCard>
            ))}
          </WordSet>
        </Background>
      ) : null}
    </>
  );
}

export default WordChoice;
