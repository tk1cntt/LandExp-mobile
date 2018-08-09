import { api } from 'config';
import axios from 'axios';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const schema = [
  `
  type Authentication {
    id_token: String
  }
`,
];

export const queries = [
  `
  login(username: String, password: String): Authentication
`,
];

export const resolvers = {
  RootQuery: {
    async login(parent, args) {
      const token = await client
        .post('/api/authenticate', {
          username: args.username,
          password: args.password,
          rememberMe: true,
        })
        .then(response => response.data)
        .catch(error => error.data);
      // console.log('login-context', response); // eslint-disable-line
      return token;
    },
  },
};
