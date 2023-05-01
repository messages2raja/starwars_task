import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./styles.scss";

export function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Logo Star Wars" />
      </Link>

      <nav>
        <Link to="/">Characters</Link>
        <Link to="/films">Films</Link>
      </nav>
    </header>
  );
}
