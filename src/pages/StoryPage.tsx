import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, AlertTitle, Card, CardActions, CardContent, CircularProgress, Link, Typography } from '@mui/material';
import CommentList from '../components/CommentList';
import newsStore from '../store/newsStore';
import { observer } from 'mobx-react-lite';

const StoryPage = observer(() => {
  const { id } = useParams();
  const { getStoryAction, story } = newsStore;

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

  if (story?.state === 'pending') return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />;
  if (story?.state === 'rejected')
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
    );

  return story?.value ? (
    <>
      {story && (
        <Card sx={{ margin: '10px', padding: '10px' }}>
          <CardContent>
            <Typography variant="h2" component="div">
              {story?.value?.title}
            </Typography>
            <Typography variant="h5">By: {story?.value.by}</Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              {story?.value.time && new Date(1000 * story?.value.time).toUTCString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href={story?.value.url}>Learn More</Link>
          </CardActions>
          <hr />
          <p>Number of comments: {story?.value?.descendants}</p>
          {Object.hasOwn(story?.value, 'kids') &&
            story?.value.kids?.map((childId) => <CommentList key={childId} commentId={childId} />)}
        </Card>
      )}
    </>
  ) : null;
});

export default StoryPage;
