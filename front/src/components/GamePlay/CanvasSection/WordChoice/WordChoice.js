import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import GET_RANDOM_WORDS from 'queries/word';
import GlobalContext from 'global.context';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import Background from './Background.style';
import WordSet from './WordSet.style';
import { WordCard, P, Icon, Div, Button } from './WordCard.style';

export default function WordChoice() {
  const { gameSocket, room } = useContext(GlobalContext);
  const { gameState, gameStateDispatch } = useContext(GamePlayContext);
  const { painter, questionWord, isWordChoiceOpen } = gameState;

  const { data, loading, error, refetch } = useQuery(GET_RANDOM_WORDS, {
    variables: { categoryId: Number(room.categoryId) },
  });

  if (loading) {
    return <></>;
  }
  if (error) {
    return 'error';
  }

  const close = (e) => {
    refetch();
    gameStateDispatch({ type: 'setIsWordChoiceOpen', isWordChoiceOpen: false });
    const { roomType, roomId } = room;
    const answer = e.target.textContent;
    gameStateDispatch({ type: 'setSelectedWord', selectedWord: answer });
    gameSocket.emit('selectWord', { answer, roomType, roomId });
  };

  const wordsChange = async () => {
    refetch();
  };

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
