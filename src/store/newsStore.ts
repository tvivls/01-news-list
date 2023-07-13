import { makeAutoObservable } from 'mobx';
import { NewsType } from '../utils/types';
import { getStoriesId, getStory } from '../servises/newsApi';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';

class NewsStore {
  newsId?: IPromiseBasedObservable<number[]>;
  story?: IPromiseBasedObservable<NewsType>;

  constructor() {
    makeAutoObservable(this);
  }

  getNewsAction = () => {
    this.newsId = fromPromise(getStoriesId());
  };

  getStoryAction = (id: number) => {
    this.story = fromPromise(getStory(id));
  };
}

export default new NewsStore();
