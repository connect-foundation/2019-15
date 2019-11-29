import React, { useState, useContext } from 'react';
import DrawingPlayGround from './DrawingPlayGround/DrawingPlayGround';
import WordChoice from './WordChoice/WordChoice';
import CanvasSectionStyle from './CanvasSection.style';
import GamePlayContext from '../../GamePlay.context';
import GlobalContext from '../../global.context';
import WordPreview from './WordPreview/WordPreview';
import Timer from '../Timer/Timer';

const CanvasSection = () => {
  const { painter } = useContext(GamePlayContext);
  const { io } = useContext(GlobalContext);
  // 출제자가 선택한 단어에 대한 정보들
  const [questionWord, setQuestionWord] = useState({
    wordLength: 0,
    openLetter: '',
    openIndex: 0,
  });
  // 타이머의 시작 여부를 결정하는 상태
  const [isTimerStart, setIsTimerStart] = useState(false);
  // 글자 공개 여부를 결정하는 상태
  const [isOpen, setIsOpen] = useState(false);
  // 출제자에 한해 사용되는, 선택한 단어를 저장하기 위한 상태
    // 출제자의 경우 선택한 단어를 서버로 보내고 다시 받기보다는
    // 프론트에서 직접 공유하는것이 더 비용이 적을 것이라고 판단
  const [selectedWord, setSelectedWord] = useState('');

  // 서버로부터 startQuestion 시그널에 대한 핸들링 함수를 설정하는 코드
    // 해당 시그널을 받으면 questionWord상태를 변경하고, 타이머를 동작시킨다
  io.setStartQuestionHandler(setQuestionWord, () => {
    setIsTimerStart(true);
  });

  return (
    <CanvasSectionStyle>
      {io.socket.id === painter ? (
        <WordChoice setSelectedWord={setSelectedWord} />
      ) : null}
      <section>
        <Timer
          isTimerStart={isTimerStart}
          setIsTimerStart={setIsTimerStart}
          setIsOpen={setIsOpen}
        />
        <WordPreview
          openLetter={questionWord.openLetter}
          wordLength={questionWord.wordLength}
          openIndex={questionWord.openIndex}
          isOpen={isOpen}
          selectedWord={selectedWord}
        />
      </section>
      <DrawingPlayGround canvasSize={{ width: 800, height: 600 }} />
    </CanvasSectionStyle>
  );
};

export default CanvasSection;
