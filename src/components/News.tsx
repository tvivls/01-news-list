import { useEffect, useState } from 'react';
import { getStory } from '../servises/newsApi';
import NewsCard from './NewsCard';
import { NewsType } from '../utils/types';

const News = ({ id }: NewsType) => {
  const [news, setNews] = useState<NewsType[]>([]);

  useEffect(() => {
    getStory(id).then((result) => result && result.url && setNews([...news, result]));
  }, []);

  return <>{news?.map((story) => <NewsCard key={story.id} {...story} />)}</>;
};

export default News;
