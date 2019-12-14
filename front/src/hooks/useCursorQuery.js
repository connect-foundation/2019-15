import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  getFirstKey,
  getLoadingWithNetwork,
  getLoadMore,
  getNodes,
  getNullPage,
} from 'logics/hooks/cursorQuery';

const useCursorQuery = (query, options = {}) => {
  const [data, setData] = useState(null);
  const {
    data: initialData,
    loading,
    error,
    fetchMore,
    refetch,
    networkStatus,
  } = useQuery(query, {
    notifyOnNetworkStatusChange: true,
    onCompleted(result) {
      const nodes = getNodes(result[getFirstKey(result)].edges);
      setData(nodes);
    },
    ...options,
  });

  const loadingWithNetwork = getLoadingWithNetwork(networkStatus, loading);

  const firstKey = getFirstKey(initialData);
  const {
    pageInfo: { endCursor, hasNextPage },
  } = firstKey ? initialData[firstKey] : getNullPage();
  const loadMore = getLoadMore(
    query,
    loading,
    fetchMore,
    endCursor,
    hasNextPage,
  );

  return {
    data,
    setData,
    loading: loadingWithNetwork,
    error,
    fetchMore: loadMore,
    hasMore: hasNextPage,
    refetch,
  };
};

export default useCursorQuery;
