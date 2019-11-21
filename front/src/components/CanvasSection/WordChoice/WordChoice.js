import React from 'react';
import Background from './Background.style';
import WordSet from './WordSet.style';
import { WordCard, P } from './WordCard.style';

// import ModalSection from './ModalSection';

const WordChoice = () => {
  return (
    <Background>
      <WordSet>
        <WordCard>
          <P>word1</P>
        </WordCard>
        <WordCard>
          <P>word2</P>
        </WordCard>
        <WordCard>
          <P>word3</P>
        </WordCard>
      </WordSet>
    </Background>
  );
};

export default WordChoice;
