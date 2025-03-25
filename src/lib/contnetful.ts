import { GraphQLClient } from "graphql-request";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`,
  {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }
);

export default client;
