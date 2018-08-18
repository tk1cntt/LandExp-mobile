import { api } from 'config';
import axios from 'axios';
import Promise from 'bluebird';
import { decodeId } from 'constants/utils';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const schema = [
  `
  type HouseDetail {
    house: House
    images: [HouseImage]
    error: Error
  }
`,
];

export const queries = [
  `
  getDetail(id: String): HouseDetail
`,
];

export const resolvers = {
  RootQuery: {
    async getDetail(parent, args) {
      console.log('getDetail-args', args) // eslint-disable-line
      const house = client
        .get(`/api/houses/${decodeId(args.id)}`)
        .then(
          response =>
            // console.log('top-response', response.data) // eslint-disable-line
            response.data,
        )
        .catch(error => ({
          error: error.response && error.response.data,
        }));

      const images = client
        .get(`/api/house-photos/${decodeId(args.id)}/houses`)
        .then(
          response =>
            // console.log('house-photos-response', response.data); // eslint-disable-line
            response.data,
        )
        .catch(error => ({
          error: error.response && error.response.data,
        }));
      const json = await Promise.props({
        // wait for all promises to resolve
        house,
        images,
        error: house.error,
      });
      return json;
    },
  },
};
