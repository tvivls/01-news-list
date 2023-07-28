import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { NewsType } from '../utils/types';
import { Rating, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { STORY_ROUTE } from '../utils/consts';
import { StyledLink } from '../styles/newsStyles';

const NewsCard = ({ title, score, by, time, id }: NewsType) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${STORY_ROUTE}/${id}`);
  };

  const date = time ? new Date(1000 * time).toUTCString() : '';

  return (
    <StyledLink onClick={handleNavigate}>
      <List
        sx={{
          bgcolor: 'background.paper',
          padding: '0',
          margin: '0 30px',
          borderRadius: '10px',
        }}
      >
        <Typography color="text.secondary" display="block" variant="caption" sx={{ padding: '0 18px' }}>
          {by}
        </Typography>
        <ListItem sx={{ padding: '0 18px' }}>
          <ListItemText primary={title} secondary={date} />
        </ListItem>
        <Rating name="read-only" value={score} readOnly sx={{ padding: '0 15px' }} />
      </List>
    </StyledLink>
  );
};

export default NewsCard;
