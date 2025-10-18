import React from "react";
import logo from '../logo.svg';

function Header() {
    return (
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Little Lemon</h1>
        <p>Chicago</p>
        </header>
    );
}

export default Header;