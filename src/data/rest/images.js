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
      .then(
        response =>
          // console.log('top-response', response.data) // eslint-disable-line
          response.data,
      )
      .catch(error =>
        error.response.data,
      );

    const images = client
      .get(`/api/house-photos/${decodeId(id)}/houses`)
      .then(
        response =>
          // console.log('house-photos-response', response.data); // eslint-disable-line
          response.data,
      )
      .catch(error =>
        error.response.data,
      );
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
    return { error: { status: 100, detail: "Server undermaintain"} };
  }
};

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
  detail,
  create,
};
