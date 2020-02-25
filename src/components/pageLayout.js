import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { SEO } from "./seo";
import { NavForm } from "./nav";
import { ThemeForm /* ThemeContext */ } from "./theme";

import { useLocalJsonForm, useGlobalJsonForm } from "gatsby-tinacms-json";

export const PageLayout = ({ page, children }) => {
  const data = useStaticQuery(graphql`
    query PageLayoutQuery {
      nav: settingsJson(
        fileRelativePath: { eq: "/content/settings/menu.json" }
      ) {
        menuItems {
          label
          link
        }

        rawJson
        fileRelativePath
      }
      theme: settingsJson(
        fileRelativePath: { eq: "/content/settings/theme.json" }
      ) {
        name

        rawJson
        fileRelativePath
      }
      site: settingsJson(
        fileRelativePath: { eq: "/content/settings/site.json" }
      ) {
        logo
        title
        description
        author

        rawJson
        fileRelativePath
      }
    }
  `);

  /* const [nav] = */ useLocalJsonForm(data.nav, NavForm);
  /* const [globalTheme] = */ useLocalJsonForm(data.theme, ThemeForm);
  /* const [site] = */ useGlobalJsonForm(data.site, SiteForm);

  // Theme information -- re-enable when theme is better fleshed out.
  // const themeContext = React.useContext(ThemeContext);

  // What is the difference between page and page.frontmatter?
  // I suppose that page.title are pages, and page.frontmatter are posts.
  const pageTitle =
    page && page.title
      ? page.title
      : page && page.frontmatter && page.frontmatter.title
      ? page.frontmatter.title
      : "";

  return (
    <>
      {pageTitle && <SEO title={pageTitle} />}
      <main>{children}</main>
    </>
  );
};

const SiteForm = {
  label: "Site",
  fields: [
    {
      label: "Logo",
      name: "rawJson.logo",
      component: "text",
      parse(value) {
        return value || "";
      }
    },
    {
      label: "Title",
      name: "rawJson.title",
      component: "text",
      parse(value) {
        return value || "";
      }
    },
    {
      label: "Description",
      name: "rawJson.description",
      component: "text",
      parse(value) {
        return value || "";
      }
    },
    {
      label: "Author",
      name: "rawJson.author",
      component: "text",
      parse(value) {
        return value || "";
      }
    }
  ]
};
