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
  const queryResponse = await client.query({
    query: mutateGetDetail,
    variables: { id: params.id },
  });
  const house = queryResponse.data.getDetail;
  return {
    title: house.house.title,
    chunks: ['detail'],
    component: (
      <Layout>
        <Detail houseEntity={house.house} housePhotoList={house.images} />
      </Layout>
    ),
  };
}

export default action;
