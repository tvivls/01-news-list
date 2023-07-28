import get from 'axios';

const baseURL = 'https://hacker-news.firebaseio.com/v0/';
const newStoriesURL = `${baseURL}newstories.json`;
export const storyURL = `${baseURL}item/`;

export const getStoriesId = async (): Promise<number[]> => {
  return await get(newStoriesURL).then(({ data }) => data && data.slice(0, 100));
};

export const getStory = async <T>(storyId: number): Promise<T> => {
  return await get(`${storyURL + storyId}.json`).then(({ data }) => data && data);
};
