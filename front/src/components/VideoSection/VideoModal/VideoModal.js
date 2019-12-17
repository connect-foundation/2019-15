import React from 'react';
import PropTypes from 'prop-types';
import {
  NonPainterBoardStyle,
  CanvasStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterBoard/NonPainterBoard.style';
import makeModal from 'components/globalComponents/Modal/Modal';
import Button from 'components/globalComponents/Button/Button';

VideoModal.propTypes = {
  word: PropTypes.string,
  setModalWord: PropTypes.func,
};

VideoModal.defaultProps = {
  word: null,
  setModalWord: null,
};

export default function VideoModal({ word, setModalWord }) {
  function close() {
    setModalWord(null);
  }

  const Body = () => (
    <NonPainterBoardStyle>
      <CanvasStyle style={{ width: 760, height: 470 }} />
    </NonPainterBoardStyle>
  );
  const Footer = () => <Button onClick={close}>닫기</Button>;

  const Modal = makeModal(null, Body, Footer);

  return <Modal />;
}
