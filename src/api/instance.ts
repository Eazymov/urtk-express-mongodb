import Axios, { AxiosInstance } from 'axios';

type Data = {
  [key: string]: any;
}

const instance: AxiosInstance = Axios.create({
  baseURL: '/api',
  timeout: 3000,
  transformResponse: [transformResponse],
});

function transformResponse (response: any): any {
  const data: Data = JSON.parse(response);
  const err: ApiError | undefined = data.err;

  if (err) {
    throw Error(err.message || err.errmsg);
  }

  return data;
}

export default instance;
