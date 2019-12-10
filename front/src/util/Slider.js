export const getNodeCenterPos = (node) => {
  return {
    x:
      node.getBoundingClientRect().left +
      node.getBoundingClientRect().width / 2,
    y:
      node.getBoundingClientRect().top +
      node.getBoundingClientRect().height / 2,
  };
};

export const pauseEvent = (e) => {
  e.stopPropagation();
  e.preventDefault();
};
