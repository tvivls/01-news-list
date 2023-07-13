import { NEWS_ROUTE, STORY_ROUTE } from './consts';
import NewsPage from '../pages/NewsPage';
import StoryPage from '../pages/StoryPage';

export const routes = [
  {
    path: NEWS_ROUTE,
    Element: NewsPage,
  },
  {
    path: STORY_ROUTE + '/:id',
    Element: StoryPage,
  },
];
