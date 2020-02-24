import React from "react";
import { ThemeProvider } from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

export const ThemeContext = React.createContext();

export const Theme = ({ children }) => {
  const data = useStaticQuery(graphql`
    query ThemeQuery {
      settingsJson(fileRelativePath: { eq: "/content/settings/theme.json" }) {
        name
      }
    }
  `);

  const theme = data.settingsJson;

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <ThemeProvider theme={theme}>
            <>{children}</>
          </ThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
};

export const ThemeForm = {
  label: "Theme",
  fields: [
    {
      label: "Name",
      name: "rawJson.name",
      component: "text"
    }
  ]
};
