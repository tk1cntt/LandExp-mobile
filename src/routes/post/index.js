/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Post from './Post';
import Layout from '../../components/Layout';

async function action({ store, pathname, fetch }) {
  const state = store.getState();
  if (!state.auth.auth) {
    return { redirect: '/dang-nhap', from: pathname }; // <== where the redirect come from?
  }
  const response = await fetch('/api/v1/houses/init', {
    method: 'GET', // handy with GraphQL backends
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${state.auth.auth.id_token}`,
    },
  });
  const house = await response.json();
  // console.log(house); // eslint-disable-line
  return {
    title: 'Đăng tin',
    chunks: ['detail'],
    component: (
      <Layout>
        <Post house={house} />
      </Layout>
    ),
  };
}

export default action;
