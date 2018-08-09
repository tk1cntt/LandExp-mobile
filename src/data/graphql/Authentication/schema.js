import { merge } from 'lodash';

/** * Queries ** */
import {
  schema as getSession,
  queries as getSessionQueries,
  resolvers as getSessionResolver,
} from './authentication/getSession';

import {
  schema as login,
  queries as loginQueries,
  resolvers as loginResolver,
} from './authentication/login';

export const schema = [...getSession, ...login];

export const queries = [...getSessionQueries, ...loginQueries];

export const resolvers = merge(getSessionResolver, loginResolver);
