import { merge } from 'lodash';

/** * Queries ** */
import {
  schema as getTop,
  queries as getTopQueries,
  resolvers as getTopResolver,
} from './house/top';

import {
  queries as getDetailQueries,
  resolvers as getDetailResolver,
} from './house/detail';

export const schema = [...getTop];

export const queries = [...getTopQueries, ...getDetailQueries];

export const resolvers = merge(getTopResolver, getDetailResolver);
