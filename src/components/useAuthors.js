/* import React from "react"; */
import { useStaticQuery, graphql } from "gatsby";

export const useAuthors = () => {
  const { settingsJson } = useStaticQuery(
    graphql`
      query authorsQuery {
        settingsJson(
          fileRelativePath: { eq: "/content/settings/authors.json" }
        ) {
          authors {
            email
            name
            id
            link
          }
        }
      }
    `
  );

  return settingsJson.authors;
};
