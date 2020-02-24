import React, { useMemo } from "react";
import { graphql } from "gatsby";
import { ListAuthors } from "../components/authors";
import { Link } from "gatsby";
import { PageLayout } from "../components/pageLayout";
import { TinaField, TinaForm } from "@tinacms/form-builder";
import { Wysiwyg } from "@tinacms/fields";
import { useLocalRemarkForm, DeleteAction } from "gatsby-tinacms-remark";
import { useAuthors } from "../components/useAuthors";

function Post(props) {
  const page = props.data.markdownRemark;
  const { isEditing, setIsEditing } = props;

  return (
    <PageLayout page={page}>
      <div>
        <div>
          <span>{page.frontmatter.date}</span>
          {page.frontmatter.authors && page.frontmatter.authors.length > 0 && (
            <span>
              <em>By</em>&nbsp;
              <ListAuthors authorIDs={page.frontmatter.authors} />
            </span>
          )}
          <span>
            <Link to="/blog">← Back to Blog</Link>
          </span>
        </div>
        <h1>
          <TinaField
            name="rawFrontmatter.title"
            Component={props => <input type="text" />}
          >
            {page.frontmatter.title}
          </TinaField>
        </h1>
        <hr />
        <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
          <div
            dangerouslySetInnerHTML={{
              __html: page.html
            }}
          />
        </TinaField>
        {page.frontmatter.draft && <span>Draft</span>}
        {process.env.NODE_ENV !== "production" && (
          <button isEditing={isEditing} onClick={() => setIsEditing(p => !p)}>
            {isEditing ? "Preview" : "Edit"}
          </button>
        )}
      </div>
    </PageLayout>
  );
}

function RemarkForm(props) {
  const authors = useAuthors();
  const PostForm = useMemo(() => {
    return {
      actions: [DeleteAction],
      fields: [
        {
          label: "Title",
          name: "rawFrontmatter.title",
          component: "text"
        },
        {
          label: "Authors",
          name: "rawFrontmatter.authors",
          component: "authors",
          authors: authors
        },
        {
          name: "rawFrontmatter.draft",
          component: "toggle",
          label: "Draft"
        },
        {
          label: "Date",
          name: "rawFrontmatter.date",
          component: "date"
        },
        {
          label: "Hero Image",
          name: "rawFrontmatter.hero.image",
          component: "image",
          parse: filename => `../images/${filename}`,
          uploadDir: () => `/content/images/`,
          previewSrc: formValues => {
            if (
              !formValues.frontmatter.hero ||
              !formValues.frontmatter.hero.image
            )
              return "";
            return formValues.frontmatter.hero.image.childImageSharp.fluid.src;
          }
        },
        {
          label: "Body",
          name: "rawMarkdownBody",
          component: "markdown"
        }
      ]
    };
  }, []);
  const [markdownRemark, form] = useLocalRemarkForm(
    props.data.markdownRemark,
    PostForm
  );

  return (
    <TinaForm form={form}>
      {editingProps => {
        return (
          <Post
            {...props}
            data={{ ...props.data, markdownRemark }}
            {...editingProps}
          />
        );
      }}
    </TinaForm>
  );
}

export default RemarkForm;

export const postQuery = graphql`
  query($path: String!) {
    markdownRemark(
      published: { eq: true }
      frontmatter: { path: { eq: $path } }
    ) {
      id
      excerpt(pruneLength: 160)
      html

      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        draft
        authors
        hero {
          large
          overlay
          image {
            childImageSharp {
              fluid(quality: 70, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }

      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
    settingsJson(fileRelativePath: { eq: "/content/settings/authors.json" }) {
      ...authors
    }
  }
`;
