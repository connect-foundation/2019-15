import { useQuery } from '@apollo/react-hooks';
import {
  getFirstKey,
  getLoadingWithNetwork,
  getLoadMore,
  getNodes,
  getNullPage,
} from 'logics/hooks/cursorQuery';

const useCursorQuery = (query, options = {}) => {
  const { data, loading, error, fetchMore, refetch, networkStatus } = useQuery(
    query,
    {
      notifyOnNetworkStatusChange: true,
      ...options,
    },
  );

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

  return {
    data: nodes,
    loading: loadingWithNetwork,
    error,
    fetchMore: loadMore,
    hasMore: hasNextPage,
    refetch,
  };
};

export default useCursorQuery;
