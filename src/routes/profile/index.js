/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Profile from './Profile';
import { SET_LOCATION_PATH_VARIABLE } from '../../constants';

const title = 'User profile';

function action({ store, pathname }) {
  const state = store.getState();
  if (!state.auth.auth) {
    // Save path name to store
    store.dispatch({
      type: SET_LOCATION_PATH_VARIABLE,
      locationPath: pathname,
    });
    return { redirect: '/dang-nhap', from: pathname }; // <== where the redirect come from?
  }
  return {
    chunks: ['profile'],
    title,
    component: (
      <Layout>
        <Profile title={title} />
      </Layout>
    ),
  };
}

export default action;
