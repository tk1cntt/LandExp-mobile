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
  }
`,
];

export const queries = [
  `
  getSession: Account
`,
];

export const resolvers = {
  RootQuery: {
    getSession(context) {
      console.log('getSession-context', context); // eslint-disable-line
      const response = client.post('/api/account', {
        username: 'user',
        password: 'user',
        rememberMe: true,
      });
      console.log('getSession-response', response); // eslint-disable-line
      return response;
    },
  },
};
