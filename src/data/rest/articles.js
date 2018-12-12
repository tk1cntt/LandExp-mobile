import { api } from 'config';
import axios from 'axios';
import { decodeId } from 'constants/utils';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const detail = async id => {
  try {
    const article = client
      .get(`/api/articles/${decodeId(id)}`)
      .then(response => response.data)
      .catch(error => error.response.data);
    return article;
  } catch (error) {
    return { error: { status: 100, detail: 'Server undermaintain' } };
  }
};

export const top = async () => {
  try {
    const data = await client
      .get('/api/articles/top')
      .then(response => response.data)
      .catch(error => error.response.data);
    return data;
  } catch (error) {
    return { error: { status: 100, detail: 'Server undermaintain' } };
  }
};

export default {
  detail,
  top,
};
