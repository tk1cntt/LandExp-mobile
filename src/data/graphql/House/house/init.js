import { api } from 'config';
import axios from 'axios';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const queries = [
  `
  getInit: HouseDetail
`,
];

export const resolvers = {
  RootQuery: {
    async getInit() {
      const house = await client
        .get(`/api/houses/init`)
        .then(response => ({
          house: response && response.data,
        }))
        .catch(error => ({
          error: error.response && error.response.data,
        }));
      return house;
    },
  },
};
