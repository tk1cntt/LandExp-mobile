/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Detail from './Detail';
import Layout from '../../components/Layout';
import mutateGetDetail from './getDetail.graphql';

async function action({ params, client }) {
  console.log(params); // eslint-disable-line
  // console.log(client); // eslint-disable-line
  const queryResponse = await client.query(
    {
      query: mutateGetDetail,
      variables: { id: params.id },
    },
  );
  console.log(queryResponse);
  return {
    title: 'React Starter Kit',
    chunks: ['detail'],
    component: (
      <Layout>
        <Detail />
      </Layout>
    ),
  };
}

export default action;
