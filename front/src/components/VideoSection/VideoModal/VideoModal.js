import React, { useEffect } from 'react';
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

      eventList.forEach((e) => {
        const eventJSON = { version: '3.5.1', objects: JSON.parse(e.data) };
        setCanvasFromJson(eventJSON);
      });
    }
  }, [data, fabricCanvas]);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  function close() {
    setModalWord(null);
  }

  const Body = () => (
    <NonPainterBoardStyle>
      <CanvasStyle ref={setFabricCanvas} style={size} />
    </NonPainterBoardStyle>
  );
  const Footer = () => <Button onClick={close}>닫기</Button>;

  const Modal = makeModal(null, Body, Footer);

  return <Modal />;
}
