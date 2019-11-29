import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import Background from './Background.style';
import WordSet from './WordSet.style';
import { WordCard, P } from './WordCard.style';
import getRandomWords from '../../../queries/word';
import GlobalContext from '../../../global.context';

WordChoice.propTypes = {
  setSelectedWord: PropTypes.func.isRequired,
};

function WordChoice({ setSelectedWord }) {
  const { io, room } = useContext(GlobalContext);
  const [open, setOpen] = useState(true);
  const { data, loading, error } = useQuery(getRandomWords);

  if (loading) {
    return 'loading';
  }
  if (error) {
    return 'error';
  }

  async function close(e) {
    setOpen(false);
    const { roomType, roomId } = room;
    const answer = e.target.textContent;
    // selectWord의 상태를 변경함
    setSelectedWord(answer);
    // 서버로 선택한 단어와 기타 정보를 전송함
      // 서버는 해당 시그널에 대한 응답으로 모든 클라이언트에게 startQuestion시그널을 전송함
    await io.selectWord({ answer, roomType, roomId });
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
