import { useEffect } from 'react';
import News from '../components/News';
import newsStore from '../store/newsStore';
import { observer } from 'mobx-react-lite';
import StateError from '../components/StateError';

const NewsPage = observer(() => {
  const { getNewsAction, newsId } = newsStore;

  useEffect(() => {
    getNewsAction();
    const intervalId = setInterval(() => {
      getNewsAction();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return newsId?.state === 'pending' || newsId?.state === 'rejected' ? (
    <StateError state={newsId?.state} />
  ) : newsId?.value ? (
    <>{newsId?.value?.map((storyId: number) => <News key={storyId} id={storyId} />)}</>
  ) : null;
});

export default NewsPage;
