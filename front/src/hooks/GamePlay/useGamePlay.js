import { useState } from 'react';

export default function useGamePlay() {
  const initialQuestionWordState = {
    wordLength: 0,
    openLetter: '',
    openIndex: 0,
  };

  // 설정 : startQuestion 시그널을 받을 때
  // 초기화 : endQuestion 시그널을 받을 때
  const [questionWord, setQuestionWord] = useState(initialQuestionWordState);
  // 설정 : GamePlay 컴포넌트에서 startQuestion 시그널을 받을 때
  // 초기화 : endQuestion 시그널을 받을 때
  const [isTimerGetReady, setIsTimerGetReady] = useState(false);
  // 설정 : Timer 컴포넌트에서 일정 시간이 지났을 때
  // 초기화 : endQuestion 시그널을 받을 때
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  // 설정 : WordChoice 컴포넌트에서 단어 선택 시, endQuestion 시그널을 받을 때
  // 초기화 : QuestionResult 컴포넌트가 사라질 때
  const [selectedWord, setSelectedWord] = useState('');
  // 설정 : endQuestion 시그널을 받을 때
  // 초기화 : QuestionResult 컴포넌트가 렌더링되고 3초 후
  const [showQuestionResult, setShowQuestionResult] = useState(false);
  // 설정 : endQuestion 시그널을 받을 때
  // 초기화 : QuestionResult 컴포넌트가 렌더링되고 3초 후
  const [scores, setScores] = useState([]);
  // 설정 : gamestart, endQuestion 시그널을 받을 때
  const [round, setRound] = useState({
    currentRound: 1,
    totalRound: 3,
  });

  const [userList, setUserList] = useState([]);
  const [painter, setPainter] = useState(null);
  const [endTime, setEndTime] = useState(0);
  const [isWordChoiceOpen, setIsWordChoiceOpen] = useState(true);
  const [showGameResult, setShowGameResult] = useState(false);

  const contextValue = {
    userList,
    setUserList,
    painter,
    setPainter,
    questionWord,
    setQuestionWord,
    isTimerGetReady,
    setIsTimerGetReady,
    isLetterOpen,
    setIsLetterOpen,
    selectedWord,
    setSelectedWord,
    showQuestionResult,
    setShowQuestionResult,
    scores,
    setScores,
    round,
    setRound,
    endTime,
    setEndTime,
    isWordChoiceOpen,
    setIsWordChoiceOpen,
    showGameResult,
    setShowGameResult,
    initialQuestionWordState,
  };

  return contextValue;
}
