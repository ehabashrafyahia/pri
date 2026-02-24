/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Infographic from './components/Infographic';
import ImageEditor from './components/ImageEditor';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Infographic />
      <ImageEditor />
    </div>
  );
}
