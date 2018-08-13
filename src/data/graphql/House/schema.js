import { merge } from 'lodash';

/** * Queries ** */
import {
  schema as getTop,
  queries as getTopQueries,
  resolvers as getTopResolver,
} from './house/top';

export const schema = [...getTop];

export const queries = [...getTopQueries];

export const resolvers = merge(getTopResolver);
