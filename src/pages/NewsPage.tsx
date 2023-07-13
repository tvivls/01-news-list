import { useEffect } from 'react';
import News from '../components/News';
import newsStore from '../store/newsStore';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';

const NewsPage = observer(() => {
  const { getNewsAction, newsId } = newsStore;

  useEffect(() => {
    getNewsAction();
    const intervalId = setInterval(() => {
      getNewsAction();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (newsId?.state === 'pending') return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />;
  if (newsId?.state === 'rejected')
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Rejected
      </Alert>
    );

  return newsId?.value ? (
    <>{newsId?.value?.map((storyId: number) => <News key={storyId && storyId} id={storyId && storyId} />)}</>
  ) : null;
});

export default NewsPage;
