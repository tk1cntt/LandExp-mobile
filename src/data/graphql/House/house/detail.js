import { api } from 'config';
import axios from 'axios';
import { decodeId } from 'constants/utils';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const queries = [
  `
  getDetail(id: String): House
`,
];

export const resolvers = {
  RootQuery: {
    async getDetail(parent, args) {
      // console.log('top-args', args) // eslint-disable-line
      const data = await client
        .get(`/api/houses/${decodeId(args.id)}`)
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
