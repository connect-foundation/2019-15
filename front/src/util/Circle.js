export const getDistance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

export const getAngle = (startPoint, endPoint) => {
  return (
    (Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * 180) /
    Math.PI
  );
};
