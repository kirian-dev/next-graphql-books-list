import { gql } from '@apollo/client';

export const GET_STORIES = gql`
  query Stories {
    stories {
      authors {
        id
        name
        storyId
      }
      createdAt
      updatedAt
      id
      image
      title
    }
  }
`;

export const GET_STORY = gql`
  query Story($id: ID!) {
    story(id: $id) {
      authors {
        id
        name
        storyId
      }
      id
      image
      title
    }
  }
`;
