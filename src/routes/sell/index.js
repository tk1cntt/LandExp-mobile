/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Sell from './Sell';
import Layout from '../../components/Layout';

async function action({ fetch, query }) {
  console.log(fetch); // eslint-disable-line
  const response = await fetch('/api/v1/search');
  const json = await response.json();
  console.log(json); // eslint-disable-line
  return {
    title: 'Tìm mua nhà',
    chunks: ['sell'],
    component: (
      <Layout>
        <Sell />
      </Layout>
    ),
  };
}

export default action;
