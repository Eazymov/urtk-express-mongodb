import instance from './instance';

export default {
  get (): Promise<Homepage> {
    return instance.get('/homepage')
      .then(({ data }) => {
        const homepage: Homepage = data.homepage;

        return homepage;
      });
  },

  update (updates: Homepage): Promise<boolean> {
    return instance
      .post('/homepage/update', updates)
      .then(() => true);
  }
};
