import { api } from 'config';
import axios from 'axios';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const schema = [
  `
  type Account {
    id: String
    login: String
    email: String
    activated: Boolean
    authorities: [String]
    error: Error
  }
`,
];

export const queries = [
  `
  getSession(token: String): Account
`,
];

export const resolvers = {
  RootQuery: {
    async getSession(parent, args) {
      const headers = args.token
        ? {
            Authorization: `Bearer ${args.token}`,
          }
        : {};
      const account = await client
        .get('/api/account', {
          headers,
        })
        .then(response => response.data)
        .catch(error =>
          // console.log(error.response.data) // eslint-disable-line
          ({
            error: error.response && error.response.data,
          }),
        );
      // console.log('getSession-response', account); // eslint-disable-line
      return account;
    },
  },
};
