/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Articles from './Articles';
import Maintain from '../maintain/Maintain';
import Layout from '../../components/Layout';

async function action({ fetch, params }) {
  const response = await fetch('/api/v1/articles', {
    method: 'GET', // handy with GraphQL backends
  });
  const json = await response.json();
  const component = json.status ? (
    <Layout>
      <Maintain />
    </Layout>
  ) : (
    <Layout>
      <Articles articleList={json} />
    </Layout>
  );
  return {
    title: 'Tin tuc bat dong san',
    chunks: ['articles'],
    component,
  };
}

export default action;
