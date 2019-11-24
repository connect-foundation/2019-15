import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Background from './Background.style';
import WordSet from './WordSet.style';
import { WordCard, P } from './WordCard.style';
import getRandomWords from '../../../queries/word';

const WordChoice = () => {
  const [open, setOpen] = useState(true);
  const { data, loading, error } = useQuery(getRandomWords);
  if (loading) {
    return 'loading';
  }
  if (error) {
    return 'error';
  }

  function close() {
    setOpen(false);
  }

  return (
    <>
      {open ? (
        <Background>
          <WordSet>
            {data.getRandomWords.map((word) => (
              <WordCard onClick={close} key={word.id}>
                <P>{word.word}</P>
              </WordCard>
            ))}
          </WordSet>
        </Background>
      ) : null}
    </>
  );
};

export default WordChoice;
