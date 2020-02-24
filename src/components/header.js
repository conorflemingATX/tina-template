import React from "react";
import { Nav } from "./nav";
import { ThemeContext } from "./theme";
import { Link } from "gatsby";

export function Header({ siteTitle }) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <header>
          <Link to="/">
            <h1>{siteTitle}</h1>
          </Link>
          <Nav />
        </header>
      )}
    </ThemeContext.Consumer>
  );
}
