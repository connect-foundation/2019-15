import React, { useState } from 'react';
import WordButton from 'components/VideoSection/WordButton/WordButton';
import VideoSectionWrapper from 'components/VideoSection/VideoSection.style';
import { GET_LATEST_WORDS_BY_USER } from 'queries/video';
import { useQuery } from '@apollo/react-hooks';
import dateFormat from 'dateformat';
import VideoModal from 'components/VideoSection/VideoModal/VideoModal';

export default function Video() {
  const { data, loading, error } = useQuery(GET_LATEST_WORDS_BY_USER);
  const [modalWord, setModalWord] = useState(null);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <VideoSectionWrapper>
      {modalWord ? (
        <VideoModal word={modalWord} setModalWord={setModalWord} />
      ) : null}
      {data.getLatestWordsByUser.map(({ word, createdAt }) => {
        const date = new Date(Number(createdAt));
        return (
          <WordButton onClick={() => setModalWord(word)}>
            {word}
            <br />
            {dateFormat(date, 'yy.mm.dd')}
          </WordButton>
        );
      })}
    </VideoSectionWrapper>
  );
}
