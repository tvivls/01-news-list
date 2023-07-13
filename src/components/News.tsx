import { useEffect, useState } from 'react';
import { getStory } from '../servises/newsApi';
import NewsCard from './NewsCard';
import { NewsType } from '../utils/types';

const News = ({ id }: NewsType) => {
  const [news, setNews] = useState<NewsType[]>([]);

  useEffect(() => {
    getStory(id).then((result) => setNews([...news, result]));
  }, []);

  return (
    <>
      {news?.map(
        (story) =>
          story?.id && (
            <NewsCard
              key={story.id}
              id={story.id}
              url={story.url}
              title={story.title}
              by={story.by}
              time={story.time}
              score={story.score}
              kids={story.kids}
            />
          ),
      )}
    </>
  );
};

export default News;
