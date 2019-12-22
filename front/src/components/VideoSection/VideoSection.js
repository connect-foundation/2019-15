import React, { useState } from 'react';
import WordButton from 'components/VideoSection/WordButton/WordButton';
import {
  VideoSectionWrapper,
  WordButtonsWrapper,
} from 'components/VideoSection/VideoSection.style';
import { GET_LATEST_WORDS_BY_USER } from 'queries/video';
import dateFormat from 'dateformat';
import VideoModal from 'components/VideoSection/VideoModal/VideoModal';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import useCursorQuery from 'hooks/commons/useCursorQuery';

export default function Video() {
  const { data, loading, error, fetchMore, hasMore } = useCursorQuery(
    GET_LATEST_WORDS_BY_USER,
  );
  const [modalWord, setModalWord] = useState(null);

  if (error) {
    return <Alert type="error" Wrapper={VideoSectionWrapper} />;
  }

  if (loading) {
    return <Loading Wrapper={VideoSectionWrapper} />;
  }

  if (!data || !data.length)
    return <Alert type="noGameHistory" Wrapper={VideoSectionWrapper} />;

  return (
    <VideoSectionWrapper>
      {modalWord ? (
        <VideoModal question={modalWord} setModalWord={setModalWord} />
      ) : null}
      <InfinityScroll loadMore={fetchMore} hasMore={hasMore}>
        <WordButtonsWrapper>
          {data.map((value) => {
            const date = new Date(Number(value.createdAt));
            return (
              <WordButton
                key={value.id}
                onClick={() =>
                  setModalWord({ questionId: value.id, word: value.word })
                }
              >
                {value.word}
                <br />
                {dateFormat(date, 'yy.mm.dd')}
              </WordButton>
            );
          })}
        </WordButtonsWrapper>
      </InfinityScroll>
    </VideoSectionWrapper>
  );
}
