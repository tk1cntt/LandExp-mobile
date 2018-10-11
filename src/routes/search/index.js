/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Search from './Search';
import Layout from '../../components/Layout';

async function action({ query }) {
  return {
    title: 'Tìm kiếm bất động sản',
    chunks: ['search'],
    component: (
      <Layout>
        <Search parameters={query} />
      </Layout>
    ),
  };
}

export default action;
