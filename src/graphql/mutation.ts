import { gql } from '@apollo/client';

export const ADD_STORY = gql`
  mutation AddStory($image: String, $title: String) {
    addStory(image: $image, title: $title) {
      authors {
        id
        name
        storyId
      }
      createdAt
      id
      image
      title
      updatedAt
    }
  }
`;

export const DELETE_STORY = gql`
  mutation deleteStory($id: ID!) {
    deleteStory(id: $id) {
      id
      title
      image
    }
  }
`;

export const UPDATE_STORY = gql`
  mutation UpdateStory($id: ID!, $title: String, $image: String) {
    updateStory(id: $id, title: $title, image: $image) {
      id
      image
      title
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation Mutation($storyId: ID!, $name: String) {
    addAuthor(storyId: $storyId, name: $name) {
      id
      name
      storyId
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation Mutation($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      storyId
    }
  }
`;
