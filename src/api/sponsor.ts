import instance from './instance';

export default {
  get (): Promise<Sponsor[]> {
    return instance
      .get('/sponsors')
      .then(({ data }) => {
        const sponsors: Sponsor[] = data.sponsors;

        return sponsors;
      })
  },

  add (sponsor: Sponsor): Promise<Sponsor> {
    return instance
      .post('/sponsors/create', sponsor)
      .then(({ data }) => {
        const sponsor: Sponsor = data.sponsor;

        return sponsor;
      })
  },

  delete (logo: string): Promise<boolean> {
    return instance
      .post('/sponsors/delete', { logo })
      .then(() => true)
  }
};
