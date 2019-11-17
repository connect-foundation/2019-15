import query from '../queries';
import opts from './http';

async function deleteFriend(id, nickname) {
  let body = JSON.stringify({ query: query.deleteFriend(id, nickname) });
  await fetch(
    `${process.env.REACT_APP_LOCAL_API_URI}/api`,
    opts(body),
  );

}

export default deleteFriend;
