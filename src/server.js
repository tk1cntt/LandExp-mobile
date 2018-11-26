/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import Promise from 'bluebird';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import { graphql } from 'graphql';
import expressGraphQL from 'express-graphql';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import PrettyError from 'pretty-error';
import createApolloClient from './core/createApolloClient';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import schema from './data/schema';
import {
  search as searchHouse,
  detail as detailHouse,
  update as updateHouse,
  init as initHouse,
  top as topHouse,
} from './data/rest/houses';

import {
  create as createPhoto,
  detail as detailPhoto,
  remove as deletePhoto,
} from './data/rest/images';

import { login, getSession } from './data/rest/session';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';

import config from './config';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
);
// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

//
// Register API middleware
// -----------------------------------------------------------------------------
// https://github.com/graphql/express-graphql#options
const graphqlMiddleware = expressGraphQL(req => ({
  schema,
  graphiql: __DEV__,
  rootValue: { request: req },
  pretty: __DEV__,
}));

app.use('/graphql', graphqlMiddleware);

app.get('/api/v1/sessions', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const response = await getSession(req.headers.authorization);
    res.send(JSON.stringify(response));
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    res.send(JSON.stringify('{ status: 100, detail: "Server undermaintain"}'));
  }
});

app.post('/api/v1/login', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const response = await login(req.body.username, req.body.password);
    res.send(JSON.stringify(response));
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    res.send(JSON.stringify('{ status: 100, detail: "Server undermaintain"}'));
  }
});

app.put('/api/v1/houses', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const response = await updateHouse(req.headers.authorization, req.body);
    res.send(JSON.stringify(response));
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    res.send(JSON.stringify('{ status: 100, detail: "Server undermaintain"}'));
  }
});

app.get('/api/v1/houses', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const response = await searchHouse(req.query);
    res.send(JSON.stringify(response));
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    res.send(JSON.stringify('{ status: 100, detail: "Server undermaintain"}'));
  }
});

app.get('/api/v1/houses/init', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const response = await initHouse(req.headers.authorization);
    res.send(JSON.stringify(response));
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    res.send(JSON.stringify('{ status: 100, detail: "Server undermaintain"}'));
  }
});

app.get('/api/v1/houses/top', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const response = await topHouse();
    res.send(JSON.stringify(response));
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    res.send(JSON.stringify('{ status: 100, detail: "Server undermaintain"}'));
  }
});

app.get('/api/v1/houses/:id', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const response = await detailHouse(req.params.id);
    res.send(JSON.stringify(response));
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    res.send(JSON.stringify('{ status: 100, detail: "Server undermaintain"}'));
  }
});

app.post('/api/v1/images', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const response = await createPhoto(req.headers.authorization, req.body);
    res.send(JSON.stringify(response));
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    res.send(JSON.stringify('{ status: 100, detail: "Server undermaintain"}'));
  }
});

app.put('/api/v1/houses', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const response = await updateHouse(req.headers.authorization, req.body);
    res.send(JSON.stringify(response));
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    res.send(JSON.stringify('{ status: 100, detail: "Server undermaintain"}'));
  }
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    const apolloClient = createApolloClient({
      schema,
      rootValue: { request: req },
    });

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
      apolloClient,
      schema,
      graphql,
    });

    const initialState = {};

    const store = configureStore(initialState, {
      cookie: req.headers.cookie,
      client: apolloClient,
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
      history: null,
    });

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    );

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
      // Apollo Client for use with react-apollo
      client: apolloClient,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    const rootComponent = <App context={context}>{route.component}</App>;
    await getDataFromTree(rootComponent);
    // this is here because of Apollo redux APOLLO_QUERY_STOP action
    await Promise.delay(0);
    data.children = await ReactDOM.renderToString(rootComponent);
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);
    data.scripts = Array.from(scripts);

    // Furthermore invoked actions will be ignored, client will not receive them!
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Serializing store...');
    }
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
      apolloState: context.client.extract(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
