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
import mutateGetHouse from './getHouse.graphql';

async function action(context) {
  console.log('post-context', context); // eslint-disable-line
  const state = context.store.getState();
  if (context.route.protected && state.session.isAuthenticated !== true) {
    return { redirect: '/dang-nhap', from: context.pathname }; // <== where the redirect come from?
  }
  const queryResponse = await context.client.query({
    query: mutateGetHouse,
  });
  const house = queryResponse.data.getInit;
  return {
    title: 'Đăng tin',
    chunks: ['detail'],
    component: (
      <Layout>
        <Post houseEntity={house.house} />
      </Layout>
    ),
  };
}

export default action;
