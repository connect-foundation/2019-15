import React from 'react';
import PropTypes from 'prop-types';
import InfinityScrollStyle from './InfinityScroll.style';

InfinityScroll.propTypes = {
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default function InfinityScroll({ loadMore, hasMore, children }) {
  const onScroll = async ({ target }) => {
    const { offsetHeight, scrollTop, scrollHeight } = target;
    if (offsetHeight + scrollTop >= scrollHeight - 5 && hasMore) {
      await loadMore();
    }
  };

  return (
    <InfinityScrollStyle onScroll={onScroll}>{children}</InfinityScrollStyle>
  );
}
