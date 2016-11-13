import React from 'react';

import Menu from './menu/container';

export default () => (
  <header className="header">
    <img className="logo" src="/assets/img/app-academy-logo-white.png" alt=""/>
    <h1 className="name">
      <a href="http://www.appacademy.io/">App Academy</a>
    </h1>

    <Menu />
  </header>
);
