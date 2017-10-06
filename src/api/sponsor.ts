import { AxiosPromise } from 'axios';

import instance from './instance';
import { handleApiError } from 'Utils/errorHandlers';

export default {
  get (): AxiosPromise {
    return instance
      .get('/sponsors')
      .then(({ data }) => {
        const { sponsors, err } = data;

        if (err) {
          handleApiError(err);
        }

        return sponsors;
      })
  }
};
