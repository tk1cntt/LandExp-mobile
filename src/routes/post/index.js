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

async function action({ store, client }) {
  console.log(store.getState().auth); // eslint-disable-line
  console.log(store.getState().session); // eslint-disable-line
  console.log(store.getState().auth.isAuthorized); // eslint-disable-line
  const queryResponse = await client.query({
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
