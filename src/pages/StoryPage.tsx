import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardActions, CardContent, Divider, Link, Typography } from '@mui/material';
import CommentList from '../components/CommentList';
import newsStore from '../store/newsStore';
import { observer } from 'mobx-react-lite';
import StateError from '../components/StateError';

const StoryPage = observer(() => {
  const { id } = useParams();
  const { getStoryAction, story } = newsStore;
  let date = '';

  useEffect(() => {
    handleRefreshComments();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleRefreshComments();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleRefreshComments = () => {
    getStoryAction(Number(id));
  };

  if (story?.state === 'pending' || story?.state === 'rejected') {
    return <StateError state={story?.state} />;
  }

  if (story?.value.time) date = new Date(1000 * story?.value.time).toUTCString();

  return story?.value ? (
    <>
      {story && (
        <Card sx={{ margin: '10px', padding: '10px', borderRadius: '10px' }}>
          <CardContent>
            <Typography variant="h2">{story?.value?.title}</Typography>
            <Typography variant="h5">By: {story?.value.by}</Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              {date}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href={story?.value.url} target="_blank">
              Learn More
            </Link>
          </CardActions>
          <Divider variant="middle" sx={{ m: 1 }} />
          <Typography>Number of comments: {story?.value?.descendants}</Typography>
          {Object.hasOwn(story?.value, 'kids') &&
            story?.value.kids?.map((commentId) => <CommentList key={commentId} commentId={commentId} />)}
        </Card>
      )}
    </>
  ) : null;
});

export default StoryPage;
