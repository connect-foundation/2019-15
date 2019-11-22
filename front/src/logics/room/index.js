const Room = (...params) => {
  if (params.length === 2) {
    return { roomType: params[0], roomId: params[1] };
  }
  return { roomType: null, roomId: null };
};

export default Room;
