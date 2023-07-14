import get from 'axios';
import { NewsType } from '../utils/types';

const baseURL = 'https://hacker-news.firebaseio.com/v0/';
const newStoriesURL = `${baseURL}newstories.json`;
const storyURL = `${baseURL}item/`;

export const getStoriesId = async (): Promise<number[]> => {
  return await get(newStoriesURL).then(({ data }) => data && data.slice(0, 100));
};

export const getStory = async (storyId: number): Promise<NewsType> => {
  return await get(`${storyURL + storyId}.json`).then(({ data }) => data && data);
};
