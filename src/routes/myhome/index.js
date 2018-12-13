/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import MyHome from './MyHome';
import Maintain from '../maintain/Maintain';
import Layout from '../../components/Layout';
import { SET_LOCATION_PATH_VARIABLE } from '../../constants';

async function action({ store, pathname, fetch }) {
  const state = store.getState();
  if (!state.auth.auth) {
    // Save path name to store
    store.dispatch({
      type: SET_LOCATION_PATH_VARIABLE,
      locationPath: pathname,
    });
    return { redirect: '/dang-nhap', from: pathname }; // <== where the redirect come from?
  }
  const component = (
    <Layout>
      <MyHome />
    </Layout>
  );
  return {
    title: 'My home',
    chunks: ['myhome'],
    component,
  };
}

export default action;
