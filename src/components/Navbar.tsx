import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import newsStore from '../store/newsStore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { NEWS_ROUTE } from '../utils/consts';

const Navbar = () => {
  const location = useLocation();
  const hasAddressId = location.pathname.includes('story');
  const { getNewsAction, getStoryAction } = newsStore;
  const navigate = useNavigate();

  const handleRefresh = () => {
    if (hasAddressId) {
      const url = location.pathname;
      const currentId = Number(url.substring(url.lastIndexOf('/') + 1));
      getStoryAction(currentId);
    } else {
      getNewsAction();
    }
  };

  const handleNavigate = () => {
    navigate(`${NEWS_ROUTE}`);
  };

  return (
    <Box sx={{ background: '#90caf9' }}>
      <AppBar position="static">
        <Toolbar>
          {hasAddressId && (
            <IconButton color="inherit" onClick={handleNavigate} size="small">
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={handleRefresh}>
            Refresh
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
