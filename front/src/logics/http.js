function opts(customBody) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: customBody,
  };
}

export default opts;
