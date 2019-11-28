import React from 'react';
import logo from './../assets/images/dontmindit-logo.svg';

export default function Navbar() {
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <span class="navbar-item">
                <img src={logo} alt="Dontmindit Logo" width="200%" height="100%" />
            </span>
        </div>
    </nav>
  );
}
