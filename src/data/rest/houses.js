import { api } from 'config';
import axios from 'axios';
import Promise from 'bluebird';
import { decodeId } from 'constants/utils';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const detail = async id => {
  try {
    const house = client
      .get(`/api/houses/${decodeId(id)}`)
      .then(response => response.data)
      .catch(error => error.response.data);

    const images = client
      .get(`/api/house-photos/${decodeId(id)}/houses`)
      .then(response => response.data)
      .catch(error => error.response.data);
    const json = await Promise.props({
      // wait for all promises to resolve
      house,
      images,
    });
    if (json.house.error) {
      return json.house.error;
    }
    return json;
  } catch (error) {
    return { error: { status: 100, detail: 'Server undermaintain' } };
  }
};

export const top = async authorization => {
  try {
    const data = await client
      .get('/api/houses/top')
      .then(response => response.data)
      .catch(error => error.response.data);
    return data;
  } catch (error) {
    return { error: { status: 100, detail: 'Server undermaintain' } };
  }
};

export const init = async authorization => {
  try {
    client.defaults.headers.Authorization = `${authorization}`;
    const data = await client
      .get('/api/houses/init')
      .then(response => response.data)
      .catch(error => error.response.data);
    return data;
  } catch (error) {
    return { error: { status: 100, detail: 'Server undermaintain' } };
  }
};

export const update = async (authorization, body) => {
  try {
    client.defaults.headers.Authorization = `${authorization}`;
    const data = await client
      .put('/api/houses', body)
      .then(response => response.data)
      .catch(error => error.response.data);
    return data;
  } catch (error) {
    return { error: { status: 100, detail: 'Server undermaintain' } };
  }
};

export const search = async query => {
  try {
    const data = await client
      .get('/api/houses/top')
      .then(response => response.data)
      .catch(error => error.response.data);
    return data;
  } catch (error) {
    return { code: 100, message: 'Server undermaintain' };
  }
};

export default {
  search,
  detail,
  init,
  top,
};
