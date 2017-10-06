import { AxiosPromise } from 'axios';

import instance from './instance';
import { handleApiError } from 'Utils/errorHandlers';

export default {
  get (): AxiosPromise {
    return instance.get('/homepage')
      .then(({ data }) => {
        const { homepage, err } = data;

        if (err) {
          handleApiError(err);
        }

        return homepage;
      });
  },

  update (updates: Homepage): AxiosPromise {
    return instance
      .post('/homepage/update', updates)
      .then(({ data }) => {
        const { success, err } = data;

        if (err) {
          handleApiError(err);
        } else if (!success) {
          handleApiError(new Error('Error while saving data'));
        }

        return success;
      });
  }
};
