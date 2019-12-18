import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  NonPainterBoardStyle,
  CanvasStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterBoard/NonPainterBoard.style';
import makeModal from 'components/globalComponents/Modal/Modal';
import Button from 'components/globalComponents/Button/Button';
import { GET_CANVAS_DATA_BY_QUESTION_ID } from 'queries/video';
import { useQuery } from '@apollo/react-hooks';
import useFabricCanvas from 'hooks/DrawingPlayGround/useFabricCanvas';
import ButtonSectionStyle from 'components/VideoSection/VideoModal/VideoModal.style';

VideoModal.propTypes = {
  question: PropTypes.shape({
    questionId: PropTypes.number,
    word: PropTypes.string,
  }),
  setModalWord: PropTypes.func,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

VideoModal.defaultProps = {
  question: null,
  setModalWord: null,
  size: { width: 760, height: 470 },
};

export default function VideoModal({ question, setModalWord, size }) {
  const { data, loading, error } = useQuery(GET_CANVAS_DATA_BY_QUESTION_ID, {
    variables: { questionId: question.questionId },
  });
  const [fabricCanvas, setFabricCanvas] = useFabricCanvas(size);
  const [speed, setSpeed] = useState(1);
  const [restart, setRestart] = useState(true);

  useEffect(() => {
    const setCanvasFromJson = (event) => {
      fabricCanvas.current.loadFromJSON(event);
      fabricCanvas.current.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false;
      });
    };

    if (data) {
      const eventList = data.getCanvasDatasByQuestionId;

      eventList.forEach((e, idx) => {
        setTimeout(() => {
          const eventJSON = { version: '3.5.1', objects: JSON.parse(e.data) };
          setCanvasFromJson(eventJSON);
        }, 500 * speed * idx);
      });
      setRestart(false);
    }
  }, [data, fabricCanvas, restart, speed]);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  const Body = () => (
    <NonPainterBoardStyle>
      <CanvasStyle ref={setFabricCanvas} style={size} />
    </NonPainterBoardStyle>
  );

  function makeSlow() {
    setSpeed(2);
    setRestart(true);
  }

  function makeFast() {
    setSpeed(1);
    setRestart(true);
  }

  function makeRestart() {
    setRestart(true);
  }

  function close() {
    setModalWord(null);
  }

  const Footer = () => (
    <ButtonSectionStyle>
      <Button onClick={makeRestart}>다시 시작</Button>
      <Button onClick={makeSlow}>느리게</Button>
      <Button onClick={makeFast}>빠르게</Button>
      <Button onClick={close}>닫기</Button>
    </ButtonSectionStyle>
  );

  const Modal = makeModal(null, Body, Footer);

  return <Modal />;
}
