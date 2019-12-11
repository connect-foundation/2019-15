import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import getRandomWords from 'queries/word';
import GlobalContext from 'global.context';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import { selectWord } from 'logics/socketLogic';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import Background from './Background.style';
import WordSet from './WordSet.style';
import { WordCard, P, Icon, Div, Button } from './WordCard.style';

WordChoice.propTypes = {
  setSelectedWord: PropTypes.func.isRequired,
};

function WordChoice({ setSelectedWord }) {
  const { gameSocket, room } = useContext(GlobalContext);
  const {
    painter,
    questionWord,
    isWordChoiceOpen,
    setIsWordChoiceOpen,
  } = useContext(GamePlayContext);
  const { data, loading, error, refetch } = useQuery(getRandomWords);

  if (loading) {
    return <></>;
  }
  if (error) {
    return 'error';
  }

  async function close(e) {
    refetch();
    setIsWordChoiceOpen(false);
    const { roomType, roomId } = room;
    const answer = e.target.textContent;
    setSelectedWord(answer);
    selectWord(gameSocket, { answer, roomType, roomId });
  }

  async function wordsChange() {
    refetch();
  }

  if (gameSocket.id !== painter && questionWord.wordLength === 0) {
    return (
      <Background>
        <P>단어 선택 중입니다!</P>
      </Background>
    );
  }

  if (gameSocket.id !== painter) return <></>;

  return (
    <>
      {isWordChoiceOpen ? (
        <Background>
          <Div>
            원하시는 제시어를 선택하세요!
            <Button onClick={wordsChange}>
              단어 변경 <Icon icon={faSync} />
            </Button>
          </Div>
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
