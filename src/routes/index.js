/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/contact',
      load: () => import(/* webpackChunkName: 'contact' */ './contact'),
    },
    {
      path: '/tai-khoan/dang-tin',
      protected: true,
      load: () => import(/* webpackChunkName: 'post' */ './post'),
    },
    {
      path: '/tai-khoan/thong-tin-ca-nhan',
      protected: true,
      load: () => import(/* webpackChunkName: 'profile' */ './profile'),
    },
    {
      path: '/tai-khoan/tin-yeu-thich',
      protected: true,
      load: () => import(/* webpackChunkName: 'like' */ './home'),
    },
    {
      path: '/tai-khoan/danh-sach-tin-dang',
      protected: true,
      load: () => import(/* webpackChunkName: 'myhome' */ './myhome'),
    },
    {
      path: '/dang-nhap',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '/dang-ky',
      load: () => import(/* webpackChunkName: 'register' */ './register'),
    },
    {
      path: '/about',
      load: () => import(/* webpackChunkName: 'about' */ './about'),
    },
    {
      path: '/privacy',
      load: () => import(/* webpackChunkName: 'privacy' */ './privacy'),
    },
    {
      path: '/admin',
      load: () => import(/* webpackChunkName: 'admin' */ './admin'),
    },
    {
      path: '/bat-dong-san/:id/xem-truoc-tin-dang',
      load: () => import(/* webpackChunkName: 'preview' */ './detail'),
    },
    {
      path: '/bat-dong-san/:id/:link',
      load: () => import(/* webpackChunkName: 'detail' */ './detail'),
    },
    {
      path: '/tin-tuc/:id/:link',
      load: () => import(/* webpackChunkName: 'article' */ './article'),
    },
    {
      path: '/tim-kiem',
      load: () => import(/* webpackChunkName: 'search' */ './search'),
    },
    {
      path: '/tim-mua-nha',
      load: () => import(/* webpackChunkName: 'sell' */ './sell'),
    },
    {
      path: '/tim-cho-thue-nha',
      load: () => import(/* webpackChunkName: 'rent' */ './rent'),
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Tinvang - Tư vấn bất động sản thời 4.0'}`;
    route.description =
      route.description ||
      'Lạ và mới. Kênh tư vấn, đầu tư bất động sản thời 4.0. Mang lại hiệu quả cho việc mua bán của bạn.';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
