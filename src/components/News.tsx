import NewsCard from './NewsCard';
import { NewsType } from '../utils/types';
import useStory from '../hooks/useStory';

const News = ({ id }: NewsType) => {
  const { data } = useStory<NewsType>(id);

  return data ? <NewsCard key={data?.id} {...data} /> : null;
};

export default News;
