import query from '../queries';
import opts from './http';

async function getFriends(id) {
  const body = JSON.stringify({ query: query.findFriendsById(id) });
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_API_URI}/api`,
    opts(body),
  );
  const responseJson = await response.json();
  return responseJson || [];
}

export default getFriends;
