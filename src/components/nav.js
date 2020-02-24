import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Moon, Sun } from "styled-icons/boxicons-regular";
import styled, { css } from "styled-components";
import { mix, transparentize } from "polished";
import { Link } from "gatsby";

export const Nav = ({ toggleDarkMode, isDarkMode }) => {
  const data = useStaticQuery(graphql`
    query navQuery {
      settingsJson(fileRelativePath: { eq: "/content/settings/menu.json" }) {
        menuItems {
          link
          label
        }
      }
    }
  `);

  const menu = data.settingsJson;

  return (
    <ul>
      {menu.menuItems.map(item => (
        <li key={item.label}>
          <Link to={item.link}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export const NavForm = {
  label: "Menu",
  fields: [
    {
      label: "Main Menu",
      name: "rawJson.menuItems",
      component: "group-list",
      itemProps: item => ({
        label: item.label
      }),
      fields: [
        {
          label: "Label",
          name: "label",
          component: "text",
          parse(value) {
            return value || "";
          }
        },
        {
          label: "Link",
          name: "link",
          component: "text",
          parse(value) {
            return value || "";
          }
        },
        {
          label: "Sub Menu",
          name: "subMenu",
          component: "group-list",
          itemProps: item => ({
            key: item.link,
            label: item.label
          }),
          fields: [
            {
              label: "Label",
              name: "label",
              component: "text"
            },
            {
              label: "Link",
              name: "link",
              component: "text"
            },
            {
              label: "Sub Menu",
              name: "subMenu",
              component: "group-list",
              itemProps: item => ({
                key: item.link,
                label: item.label
              }),
              fields: [
                {
                  label: "Label",
                  name: "label",
                  component: "text"
                },
                {
                  label: "Link",
                  name: "link",
                  component: "text"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
