import useSWR from 'swr';
import { getStory, storyURL } from '../servises/newsApi';

const useStory = <T>(id: number) => {
  const fetcher = () => getStory<T>(id);
  const { data, error, isLoading } = useSWR<T>(`${storyURL + id}.json`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
};

export default useStory;
