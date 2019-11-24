import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Background from './Background.style';
import WordSet from './WordSet.style';
import { WordCard, P } from './WordCard.style';
import getRandomWords from '../../../queries/word';

const WordChoice = () => {
  const { data, loading, error } = useQuery(getRandomWords);
  if (loading) {
    return 'loading';
  }
  if (error) {
    return 'error';
  }

  return (
    <Background>
      <WordSet>
        {data.getRandomWords.map((word) => (
          <WordCard key={word.id}>
            <P>{word.word}</P>
          </WordCard>
        ))}
      </WordSet>
    </Background>
  );
};

export default WordChoice;
