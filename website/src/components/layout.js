'use strict';

import React from 'react';
import {RouteHandler} from 'react-router'

const HeaderSection = require('./header-section');
const FooterSection = require('./footer-section');


export default class Layout extends React.Component{

  render() {
    return (
      <div>
        <header id="header">
          <HeaderSection/>
        </header>
        <div id="mainContent" className="container">
          <RouteHandler/>
        </div>
        <footer id="footer">
          <FooterSection/>
        </footer>
      </div>
    );
  }
};