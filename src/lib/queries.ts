import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetAllPosts {
    postCollection {
      items {
        title
        slug
        coverImage {
          title
          fileName
          url
        }
        author {
          name
          picture {
            title
            description
          }
        }
      }
    }
  }
`;

export const GET_POSTS_DETAILS = gql`
  query GetPostBySlug($slug: String!) {
    postCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        coverImage {
          title
          fileName
          url
        }
        author {
          name
          picture {
            title
            description
            url
          }
        }
        content {
          json
        }
        paragraph
      }
    }
  }
`;
