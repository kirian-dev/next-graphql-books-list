export const typeDefs = `#graphql
  type Story {
    id: ID!
    title: String
    image: String
    createdAt: String
    updatedAt: String
    authors: [Author]
  }

  type Author {
    id: ID!
    name: String
    storyId: String
    createdAt: String
    updatedAt: String
    story: Story
  }

  type Query {
    story(id: ID!): Story
    stories: [Story]
  }

  type Mutation {
    addStory(image: String, title: String): Story
    updateStory(id: ID!, image: String, title: String): Story
    deleteStory(id: ID!): Story
    addAuthor(storyId: ID!, name: String): Author
    deleteAuthor(id: ID!): Author
  }
`;
