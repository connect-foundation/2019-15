/* eslint no-param-reassign:0 */
import { useReducer } from 'react';
import produce from 'immer';

export default function useGamePlay() {
  const initialQuestionWordState = {
    wordLength: 0,
    openLetter: '',
    openIndex: 0,
  };

  const initialRoundState = {
    currentRound: 1,
    totalRound: 3,
  };

  const initialGameState = {
    questionWord: initialQuestionWordState,
    isTimerGetReady: false,
    isLetterOpen: false,
    selectedWord: '',
    showQuestionResult: false,
    scores: [],
    round: initialRoundState,
    userList: [],
    painter: undefined,
    endTime: 0,
    isWordChoiceOpen: true,
    showGameResult: false,
  };

  const gameStateReducer = (state, action) => {
    switch (action.type) {
      case 'setQuestionWord': {
        return produce(state, (draftState) => {
          draftState.questionWord = action.questionWord;
        });
      }
      case 'setIsTimerGetReady': {
        return produce(state, (draftState) => {
          draftState.isTimerGetReady = action.isTimerGetReady;
        });
      }
      case 'setIsLetterOpen': {
        return produce(state, (draftState) => {
          draftState.isLetterOpen = action.isLetterOpen;
        });
      }
      case 'setSelectedWord': {
        return produce(state, (draftState) => {
          draftState.selectedWord = action.selectedWord;
        });
      }
      case 'setShowQuestionResult': {
        return produce(state, (draftState) => {
          draftState.showQuestionResult = action.showQuestionResult;
        });
      }
      case 'setScores': {
        return produce(state, (draftState) => {
          draftState.scores = action.scores;
        });
      }
      case 'setRound': {
        return produce(state, (draftState) => {
          draftState.round = action.round;
        });
      }
      case 'setUserList': {
        return produce(state, (draftState) => {
          draftState.userList = action.userList;
        });
      }
      case 'setPainter': {
        return produce(state, (draftState) => {
          draftState.painter = action.painter;
        });
      }
      case 'setEndTime': {
        return produce(state, (draftState) => {
          draftState.endTime = action.endTime;
        });
      }
      case 'setIsWordChoiceOpen': {
        return produce(state, (draftState) => {
          draftState.isWordChoiceOpen = action.isWordChoiceOpen;
        });
      }
      case 'setShowGameResult': {
        return produce(state, (draftState) => {
          draftState.showGameResult = action.showGameResult;
        });
      }
      default: {
        throw new Error(`no such action type : ${action.type}`);
      }
    }
  };

  const [gameState, gameStateDispatch] = useReducer(
    gameStateReducer,
    initialGameState,
  );

  return [
    gameState,
    gameStateDispatch,
    initialQuestionWordState,
    initialRoundState,
  ];
}
