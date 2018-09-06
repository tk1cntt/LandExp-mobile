import { api } from 'config';
import axios from 'axios';
import { decodeId } from 'constants/utils';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const schema = [
  `
  type HouseImage {
    id: Int
    imageContentType: String
    image: String
    mobileLink: String
    webLink: String
    houseId: Int
  }

  type HouseImages {
    contents: [HouseImage]
    error: Error
  }
`,
];

export const queries = [
  `
  getImages(id: String): HouseImages
`,
];

export const resolvers = {
  RootQuery: {
    async getDetail(parent, args) {
      // console.log('top-args', args) // eslint-disable-line
      const data = await client
        .get(`/api/house-photos/${decodeId(args.id)}/houses`)
        .then(response =>
          // console.log('top-response', response.data) // eslint-disable-line
          ({
            contents: response.data,
          }),
        )
        .catch(error => ({
          error: error.response && error.response.data,
        }));
      // console.log('top-response', data) // eslint-disable-line
      return data;
    },
  },
};
