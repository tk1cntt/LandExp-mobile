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
import Maintain from '../maintain/Maintain';
import Layout from '../../components/Layout';
import {  SERVER_IMAGE_URL, SERVER_URL, stringToSlug } from 'constants/utils';

async function action({ fetch, params }) {
  const response = await fetch(`/api/v1/houses/${params.id}`, {
    method: 'GET', // handy with GraphQL backends
  });
  const json = await response.json();
  const component = json.status ? (
    <Layout>
      <Maintain />
    </Layout>
  ) : (
    <Layout>
      <Detail houseEntity={json.house} housePhotoList={json.images} />
    </Layout>
  );
  const imageUrl = `${SERVER_IMAGE_URL}/api/house-photos/${params.id}/thumbnails.jpg`;
  const canonicalUrl = `${SERVER_URL}/bat-dong-san/${params.id}/${json.house ? stringToSlug(json.house.title) : ""}`;
  return {
    canonicalUrl,
    imageUrl,
    title: `${json.house ? json.house.title : "Tin nha dat"} ${params.id}`,
    chunks: ['detail'],
    component,
  };
}

export default action;
