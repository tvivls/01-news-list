import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { NewsType } from '../utils/types';
import { Link, Rating, Typography } from '@mui/material';
import { NewsCardStyles } from '../styles/newsStyles';
import { useNavigate } from 'react-router-dom';
import { STORY_ROUTE } from '../utils/consts';

const NewsCard = ({ title, score, by, time, id }: NewsType) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${STORY_ROUTE}/${id}`);
  };

  return (
    <NewsCardStyles>
      <Link onClick={handleNavigate} sx={{ textDecoration: 'none', color: 'black', padding: '0 1px' }}>
        <List
          sx={{
            bgcolor: 'background.paper',
            padding: '0',
            borderRadius: '10px',
          }}
        >
          <Typography color="text.secondary" display="block" variant="caption" sx={{ padding: '0 18px' }}>
            {by}
          </Typography>
          <ListItem sx={{ padding: '0 18px' }}>
            <ListItemText primary={title} secondary={time && new Date(1000 * time).toUTCString()} />
          </ListItem>
          <div>
            <Rating name="read-only" value={score} readOnly sx={{ padding: '0 15px' }} />
          </div>
        </List>
      </Link>
    </NewsCardStyles>
  );
};

export default NewsCard;
