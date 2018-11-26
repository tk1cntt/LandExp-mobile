import { api } from 'config';
import axios from 'axios';
import Promise from 'bluebird';
import { decodeId } from 'constants/utils';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const getSession = async (authorization) => {
  try {
    client.defaults.headers['Authorization'] = `${authorization}`;
    const account = await client
      .get('/api/account')
      .then(response => response.data)
      .catch(error => error.response.data);
    return account;
  } catch (error) {
    return { error: { status: 100, detail: "Server undermaintain"} };
  }
};

export const login = async (username, password) => {
  try {
    const token = await client
      .post('/api/authenticate', {
        username,
        password,
        rememberMe: true,
      })
      .then(response => response.data)
      .catch(error => error.response.data);
    return token;
  } catch (error) {
    return { error: { status: 100, detail: "Server undermaintain"} };
  }
};

export default {
  getSession,
  login,
};
