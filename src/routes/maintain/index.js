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
import Maintain from './Maintain';

const title = 'Server undermaintain';

function action() {
  return {
    chunks: ['main-tain'],
    title,
    component: (
      <Layout>
        <Maintain title={title} />
      </Layout>
    ),
    status: 500,
  };
}

export default action;
