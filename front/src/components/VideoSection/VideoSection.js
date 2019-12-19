import React, { useState } from 'react';
import WordButton from 'components/VideoSection/WordButton/WordButton';
import VideoSectionWrapper from 'components/VideoSection/VideoSection.style';
import { GET_LATEST_WORDS_BY_USER } from 'queries/video';
import { useQuery } from '@apollo/react-hooks';
import dateFormat from 'dateformat';
import VideoModal from 'components/VideoSection/VideoModal/VideoModal';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';

export default function Video() {
  const { data, loading, error } = useQuery(GET_LATEST_WORDS_BY_USER);
  const [modalWord, setModalWord] = useState(null);

  if (error) {
    return <Alert type="error" Wrapper={VideoSectionWrapper} />;
  }

  if (loading) {
    return <Loading Wrapper={VideoSectionWrapper} />;
  }
  return (
    <VideoSectionWrapper>
      {modalWord ? (
        <VideoModal question={modalWord} setModalWord={setModalWord} />
      ) : null}
      {data.getLatestWordsByUser.map(({ id, word, createdAt }) => {
        const date = new Date(Number(createdAt));
        return (
          <WordButton onClick={() => setModalWord({ questionId: id, word })}>
            {word}
            <br />
            {dateFormat(date, 'yy.mm.dd')}
          </WordButton>
        );
      })}
    </VideoSectionWrapper>
  );
}
