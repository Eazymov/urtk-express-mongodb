import { AxiosPromise } from 'axios';

import instance from './instance';
import { handleApiError } from 'Utils/errorHandlers';

export default {
  get (): AxiosPromise {
    return instance
      .get('/sections')
      .then(({ data }) => {
        const { sections, err } = data;

        if (err) {
          handleApiError(err);
        }

        return sections;
      });
  },

  delete (_id: string): AxiosPromise {
    return instance.post('/api/sections/delete', { _id });
  }
};
