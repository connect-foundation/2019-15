import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NonPainterBoardStyle } from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/NonPainterBoard.style';
import makeModal from 'components/globalComponents/Modal/Modal';
import Button from 'components/globalComponents/Button/Button';
import { GET_CANVAS_DATA_BY_QUESTION_ID } from 'queries/video';
import { useQuery } from '@apollo/react-hooks';
import ButtonSectionStyle from 'components/VideoSection/VideoModal/VideoModal.style';
import Alert from 'components/globalComponents/Alert/Alert';
import Canvas from './Canvas/Canvas';

VideoModal.propTypes = {
  question: PropTypes.shape({
    questionId: PropTypes.number,
    word: PropTypes.string,
  }),
  setModalWord: PropTypes.func,
};

VideoModal.defaultProps = {
  question: null,
  setModalWord: null,
};

export default function VideoModal({ question, setModalWord }) {
  const { data, loading, error } = useQuery(GET_CANVAS_DATA_BY_QUESTION_ID, {
    variables: { questionId: question.questionId },
  });
  const [speed, setSpeed] = useState(1);
  const [restart, setRestart] = useState(true);

  const makeSlow = () => {
    setSpeed(2);
    setRestart(true);
  };

  const makeFast = () => {
    setSpeed(1);
    setRestart(true);
  };

  const makeRestart = () => {
    setRestart(true);
  };

  const close = () => {
    setModalWord(null);
  };

  if (error) {
    const Body = () => <Alert type="error" Wrapper={ButtonSectionStyle} />;
    const Footer = () => <Button onClick={close}>닫기</Button>;
    const Modal = makeModal(null, Body, Footer);
    return <Modal />;
  }

  if (loading) {
    return <></>;
  }

  const Header = () => <p></p>;

  const Body = () => (
    <NonPainterBoardStyle>
      <Canvas
        canvasDatas={data.getCanvasDatasByQuestionId}
        speed={speed}
        setRestart={setRestart}
      />
    </NonPainterBoardStyle>
  );

  const Footer = () => (
    <ButtonSectionStyle>
      <Button onClick={makeRestart}>다시 시작</Button>
      <Button onClick={makeSlow}>느리게</Button>
      <Button onClick={makeFast}>빠르게</Button>
      <Button onClick={close}>닫기</Button>
    </ButtonSectionStyle>
  );

  const Modal = makeModal(Header, Body, Footer);

  return <Modal />;
}
