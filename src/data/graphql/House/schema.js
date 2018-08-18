import { merge } from 'lodash';

/** * Queries ** */
import {
  schema as getTop,
  queries as getTopQueries,
  resolvers as getTopResolver,
} from './house/top';

import {
  schema as getImages,
  queries as getImagesQueries,
  resolvers as getImagesResolver,
} from './house/images';

import {
  schema as getDetail,
  queries as getDetailQueries,
  resolvers as getDetailResolver,
} from './house/detail';

import {
  queries as getInitQueries,
  resolvers as getInitResolvers,
} from './house/init';

export const schema = [...getTop, ...getImages, ...getDetail];

export const queries = [
  ...getTopQueries,
  ...getImagesQueries,
  ...getDetailQueries,
  ...getInitQueries,
];

export const resolvers = merge(
  getTopResolver,
  getImagesResolver,
  getDetailResolver,
  getInitResolvers,
);
