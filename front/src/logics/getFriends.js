import query from '../queries';
import opts from './http';

async function getFriends(id) {
  let body = JSON.stringify({ query: query.findFriendsById(id) });
  let response = await fetch(
    `${process.env.REACT_APP_LOCAL_API_URI}/api`,
    opts(body),
  );
  let responseJson = await response.json();
  return responseJson || [];
}

export default getFriends;
