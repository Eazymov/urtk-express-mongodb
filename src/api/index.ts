import Axios, { AxiosPromise } from 'axios';

const Api: { [key: string]: any } = {};

Api.Homepage = {
  get (): AxiosPromise {
    return Axios.get('/api/homepage');
  },

  update (updates: Homepage): AxiosPromise {
    return Axios.post('/api/homepage/update', updates);
  }
}

Api.Section = {
  get (): AxiosPromise {
    return Axios.get('/api/sections');
  },

  delete (_id: string): AxiosPromise {
    return Axios.post('/api/sections/delete', { _id });
  }
}

Api.Sponsor = {
  get (): AxiosPromise {
    return Axios.get('/api/sponsors');
  }
}

export default Api;