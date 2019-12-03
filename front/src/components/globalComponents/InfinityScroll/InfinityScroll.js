import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import InfinityScrollStyle from './InfinityScroll.style';

InfinityScroll.propTypes = {
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default function InfinityScroll({ loadMore, hasMore, children }) {
  const onScroll = useCallback(
    ({ target: { scrollHeight, scrollTop, clientHeight } }) => {
      if (scrollHeight - scrollTop <= clientHeight && hasMore) {
        loadMore();
      }
    },
    [hasMore, loadMore],
  );

  return (
    <InfinityScrollStyle onScroll={onScroll}>{children}</InfinityScrollStyle>
  );
}
