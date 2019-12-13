import { useLazyQuery } from '@apollo/react-hooks';
import {
  getFirstKey,
  getLoadingWithNetwork,
  getLoadMore,
  getNodes,
  getNullPage,
} from 'logics/hooks/cursorQuery';

const useCursorLazyQuery = (query, options = {}) => {
  const [
    getData,
    { data, loading, error, fetchMore, networkStatus },
  ] = useLazyQuery(query, {
    notifyOnNetworkStatusChange: true,
    ...options,
  });

  const loadingWithNetwork = getLoadingWithNetwork(networkStatus, loading);

  const firstKey = getFirstKey(data);
  const {
    pageInfo: { endCursor, hasNextPage },
    edges,
  } = firstKey ? data[firstKey] : getNullPage();
  const loadMore = getLoadMore(
    query,
    loading,
    fetchMore,
    endCursor,
    hasNextPage,
  );
  const nodes = getNodes(edges);

  return [
    getData,
    {
      data: nodes,
      loading: loadingWithNetwork,
      error,
      fetchMore: loadMore,
      hasMore: hasNextPage,
    },
  ];
};

export default useCursorLazyQuery;
