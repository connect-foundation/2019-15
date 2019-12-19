import React, { useEffect, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import makeEmptyArray from 'logics/wordPreview/makeEmptyArray';
import WordPreviewStyle from './WordPreview.style';

WordPreview.propTypes = {
  wordLength: PropTypes.number.isRequired,
  openIndex: PropTypes.number.isRequired,
  openLetter: PropTypes.string.isRequired,
  isLetterOpen: PropTypes.bool.isRequired,
  selectedWord: PropTypes.string,
};

WordPreview.defaultProps = {
  selectedWord: '',
};

const lettersReducer = (state, action) => {
  switch (action.type) {
    case 'makeNewArray': {
      return makeEmptyArray(action.arg);
    }
    case 'openLetter': {
      const copied = [...state];
      copied[action.arg.openIndex] = action.arg.openLetter;
      return copied;
    }
    case 'openWord': {
      return Array.from(action.arg);
    }
    default: {
      throw Error('please check action type');
    }
  }
};

export default function WordPreview({
  wordLength,
  openIndex,
  openLetter,
  isLetterOpen,
  selectedWord,
}) {
  const [letters, lettersDispatch] = useReducer(
    lettersReducer,
    makeEmptyArray(wordLength),
  );

  const openLetterTrigger = useCallback(() => {
    lettersDispatch({
      type: 'openLetter',
      arg: {
        openIndex,
        openLetter,
      },
    });
  }, [lettersDispatch, openIndex, openLetter]);

  useEffect(() => {
    if (selectedWord.length > 0)
      lettersDispatch({ type: 'openWord', arg: selectedWord });
    else {
      lettersDispatch({ type: 'makeNewArray', arg: wordLength });
      if (isLetterOpen) openLetterTrigger();
    }
  }, [
    wordLength,
    openIndex,
    openLetter,
    isLetterOpen,
    selectedWord,
    openLetterTrigger,
  ]);

  return <WordPreviewStyle>{letters}</WordPreviewStyle>;
}
