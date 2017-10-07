import instance from './instance';

export default {
  get (): Promise<News[]> {
    return instance
      .get('/news')
      .then(({ data }) => {
        const news: News[] = data.news;

        return news;
      })
  },
  
  create () {

  },

  update () {

  },

  delete (_id: string): Promise<boolean> {
    return instance
      .post('/news/delete', { _id })
      .then(() => true);
  }
};
