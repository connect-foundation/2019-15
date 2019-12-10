/* eslint no-param-reassign:0 */
import React, {
  useReducer,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  HandlebarStyle,
  LineStyle,
  SliderStyle,
} from 'components/globalComponents/Slider/Slider.style';
import { getNodeCenterPos } from 'util/Slider';

Slider.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  initialStep: PropTypes.number,
  unit: PropTypes.number,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  max: 10,
  min: 0,
  initialStep: 5,
  unit: 1,
  onChange: () => {},
};

export default function Slider({ max, min, unit, onChange, initialStep }) {
  const stepReducer = useCallback(
    (state, action) => {
      if (action.type === 'increase')
        return state + unit <= max ? state + unit : state;
      if (action.type === 'decrease')
        return state - unit >= min ? state - unit : state;
      if (action.type === 'changeStep') {
        const newStep = state + action.value;
        return newStep >= min && newStep <= max ? newStep : state;
      }
      throw new Error(`${action.type} is wrong action type`);
    },
    [max, min, unit],
  );

  const [handlebarLeft, setHandlebarLeft] = useState(0);
  const [step, stepDispatch] = useReducer(stepReducer, initialStep);
  const lineUnitLength = useRef(null);

  useEffect(() => {
    setHandlebarLeft(((step - min) / unit) * lineUnitLength.current);
    onChange(step);
  }, [lineUnitLength, min, onChange, step, unit]);

  const setSliderEvents = useCallback(
    (sliderNode) => {
      if (!sliderNode) return;
      const handlebarNode = sliderNode.firstChild;
      lineUnitLength.current =
        sliderNode.lastChild.clientWidth / ((max - min) / unit);
      let isDown = false;

      const getLengthDiff = (x) => x - getNodeCenterPos(handlebarNode).x;

      const getStepDiff = (lengthDiff) => {
        const halfLineUnitLength = lineUnitLength.current / 2;
        const errorRange =
          lengthDiff > 0 ? halfLineUnitLength : -halfLineUnitLength;
        return (
          parseInt((lengthDiff + errorRange) / lineUnitLength.current, 10) *
          unit
        );
      };

      const onMouseDown = (e) => {
        e.preventDefault();
        if (e.target === sliderNode.firstChild) {
          isDown = true;
        } else if (e.target === sliderNode.lastChild) {
          const lengthDiff = getLengthDiff(e.clientX);

          stepDispatch({
            type: 'changeStep',
            value: getStepDiff(lengthDiff),
          });
        }
      };
      const onMouseMove = (e) => {
        e.preventDefault();
        if (!isDown) return;

        const diff = getLengthDiff(e.clientX);

        if (diff >= lineUnitLength.current) {
          stepDispatch({ type: 'increase' });
        } else if (diff <= -lineUnitLength.current) {
          stepDispatch({ type: 'decrease' });
        }
      };
      const onMouseEnd = () => {
        isDown = false;
      };

      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseEnd);
      document.addEventListener('mouseleave', onMouseEnd);
    },
    [lineUnitLength, max, min, unit],
  );

  return (
    <SliderStyle ref={setSliderEvents}>
      <HandlebarStyle left={handlebarLeft} step={step} />
      <LineStyle />
    </SliderStyle>
  );
}
