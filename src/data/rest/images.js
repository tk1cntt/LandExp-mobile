import { api } from 'config';
import axios from 'axios';
import Promise from 'bluebird';
import { decodeId } from 'constants/utils';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const create = async (authorization, body) => {
  try {
    client.defaults.headers['Authorization'] = `${authorization}`;
    const data = await client
      .post('/api/house-photos', body)
      .then(
        response =>
          // console.log('top-response', response.data) // eslint-disable-line
          response.data,
      )
      .catch(error =>
        error.response.data,
      );
    // console.log('top-response', data) // eslint-disable-line
    return data;
  } catch (error) {
    return { error: { status: 100, detail: "Server undermaintain"} };
  }
};

export const remove = async (authorization, id) => {
  try {
    client.defaults.headers['Authorization'] = `${authorization}`;
    const data = await client
      .delete(`/api/house-images/${id}`)
      .then(
        response =>
          // console.log('top-response', response.data) // eslint-disable-line
          response.data,
      )
      .catch(error =>
        error.response.data,
      );
    // console.log('top-response', data) // eslint-disable-line
    return data;
  } catch (error) {
    return { error: { status: 100, detail: "Server undermaintain"} };
  }
};

export default {
  remove,
  create,
};
