import { AxiosPromise } from 'axios';

import instance from './instance';

export default {
  get (): Promise<Section[]> {
    return instance
      .get('/sections')
      .then(({ data }) => {
        const sections: Section[] = data.sections;

        return sections;
      });
  },

  delete (_id: string): AxiosPromise {
    return instance.post('/api/sections/delete', { _id });
  }
};
