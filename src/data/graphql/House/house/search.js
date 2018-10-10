import { api } from 'config';
import axios from 'axios';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const queries = [
  `
  getSearch(page: Int, size: Int): [House]
`,
];

export const resolvers = {
  RootQuery: {
    async getSearch(parent, args) {
      console.log('getSearch', args) // eslint-disable-line
      const data = await client
        .get('/api/houses/top')
        .then(
          response =>
            // console.log('top-response', response.data) // eslint-disable-line
            response.data,
        )
        .catch(error => ({
          error: error.response && error.response.data,
        }));
      // console.log('top-response', data) // eslint-disable-line
      return data;
    },
  },
};
