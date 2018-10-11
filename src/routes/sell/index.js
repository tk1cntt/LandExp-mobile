/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import queryString from 'query-string';
import Sell from './Sell';
import Layout from '../../components/Layout';

async function action({ fetch, query }) {
  const response = await fetch(
    `/api/v1/search?${queryString.stringify(query)}`,
    {
      method: 'GET', // handy with GraphQL backends
    },
  );
  const json = await response.json();
  // console.log(json); // eslint-disable-line
  return {
    title: 'Tìm mua nhà',
    chunks: ['sell'],
    component: (
      <Layout>
        <Sell queryString={query} houseList={json} />
      </Layout>
    ),
  };
}

export default action;
