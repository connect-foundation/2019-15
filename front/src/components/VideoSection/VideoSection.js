import React from 'react';
import WordButton from 'components/VideoSection/WordButton/WordButton';
import VideoSectionWrapper from 'components/VideoSection/VideoSection.style';
import { GET_LATEST_WORDS_BY_USER } from 'queries/video';
import { useQuery } from '@apollo/react-hooks';
import dateFormat from 'dateformat';

export default function Video() {
  const { data, loading, error } = useQuery(GET_LATEST_WORDS_BY_USER);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <VideoSectionWrapper>
      {data.getLatestWordsByUser.map(({ word, createdAt }) => {
        const date = new Date(Number(createdAt));
        return (
          <WordButton>
            {word}
            <br />
            {dateFormat(date, 'yy.mm.dd')}
          </WordButton>
        );
      })}
    </VideoSectionWrapper>
  );
}
